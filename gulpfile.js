var gulp = require('gulp');

var eslint = require('gulp-eslint');
var gulpUtil = require('gulp-util');
var gulpRename = require('gulp-rename');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var path = require('path');
var args = require('yargs').argv;
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var protractor = require('gulp-protractor').protractor;

var serverPort = '8001';
var publicPath = 'http://localhost:' + serverPort;
var contentBase = path.resolve(process.cwd(), "./src");
var reactDatepickerPath = path.resolve(process.cwd(), "./node_modules/react-datepicker");
var preLoadedIncludedModules = [contentBase, reactDatepickerPath];
var entryPointRelative = './src/containers/Root.js';
var output = path.resolve(process.cwd(), './dist');

gulp.task('lint', function () {
  gulp.src(['./src/*/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('e2e', function () {
  gulp.src(["./tests/*-test.js"])
    .pipe(protractor({
      configFile: "tests/protractor.config.js"
    }))
    .on('error', function(e) { throw e });
});

gulp.task('dev', function () {
  var serverConfig = {
    entry: [
      'webpack-dev-server/client?' + publicPath,
      'webpack/hot/only-dev-server',
      entryPointRelative
    ],
    output: {
      path: __dirname,
      publicPath: './',
      filename: '[name].js',
    },
    devServer: true,
    hotComponents: true,
    devtool: 'eval',
    debug: true,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(args.env || 'test'),
        },
      }),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      modulesDirectories: ['node_modules'],
      fallback: path.join(__dirname, 'node_modules'),
    },
    resolveLoader: {
      modulesDirectories: ['node_modules'],
      fallback: path.join(__dirname, 'node_modules'),
    },
    module: {
      preLoaders: [{
        test: [/\.jsx$/, /\.js$/],
        include: preLoadedIncludedModules,
        loaders: ['react-hot', 'babel?optional[]=runtime&stage=0']
      }],
      loaders: [{
        test: /\.less$/,
        loader: 'style!css!autoprefixer-loader!less'
      }, {
        test: /\.jpg$/,
        loader: "file-loader?prefix=assets/images/"
      }, {
        test: /\.png$/,
        loader: "file-loader?prefix=assets/images/"
      }, {
        test: /\.ico/,
        loader: "file-loader?prefix=assets/images/"
      }, {
        test: /\.svg/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.eot/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.ttf/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.woff/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.gif/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }]
    }
  };

  // Start a webpack-dev-server
  new webpackDevServer(webpack(serverConfig), {
    contentBase: contentBase,
    stats: {
      colors: true
    }
  }).listen(serverPort, '0.0.0.0', function (err) {
    if (err) throw new gulpUtil.PluginError('webpack-dev-server', err);
    gulpUtil.log('[webpack-dev-server]', publicPath + '/');
  });
});

gulp.task('build', function (callback) {
  console.log('Environment:', JSON.stringify(args.env || 'staging'));

  var webpackConfig = {
    entry: {
      main: entryPointRelative
    },
    output: {
      path: output,
      filename: '[name].js'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
    module: {
      preLoaders: [{
        test: [/\.jsx$/, /\.js$/],
        include: preLoadedIncludedModules,
        loaders: ['babel-loader?optional[]=runtime&stage=0']
      }],
      loaders: [{
        test: /\.less$/,
        include: preLoadedIncludedModules,
        loader: extractTextWebpackPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
      }, {
        test: /\.jpg$/,
        loader: "file-loader?prefix=assets/images/"
      }, {
        test: /\.png$/,
        loader: "file-loader?prefix=assets/images/"
      }, {
        test: /\.ico$/,
        loader: "file-loader?prefix=assets/images/"
      }, {
        test: /\.svg/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.eot/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.ttf/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.woff/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.gif/,
        loader: "file-loader?prefix=assets/fonts/"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }]
    },
    resolve: {
      alias: {
        'react': path.join(__dirname, 'node_modules', 'react')
      },
      extensions: ['', '.js', '.jsx', '.json'],
      modulesDirectories: ['node_modules']
    },
    resolveLoader: {
      modulesDirectories: ['node_modules']
    },

    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new extractTextWebpackPlugin('[name].css'),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(args.env || 'test'),
        },
      }),
    ],
  };

  webpack(webpackConfig, function (err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('build', err);
    }
    gulpUtil.log('[build]', stats.toString({
      colors: true
    }));
    callback();
  });

  gulp.src('./src/index-build.html')
    .pipe(gulpRename('index.html'))
    .pipe(gulp.dest(output));
});

gulp.task('default', ['dev']);
