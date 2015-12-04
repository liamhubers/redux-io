/**
 * Configure store helper.
 * @module configureStore
 * @author Flex Appeal
 * @licstart The following is the entire license notice for the JavaScript
 *           code in this page.
 *
 * Copyright (C) 2015 Flex Appeal. All rights reserved.
 *
 * @licence The above is the entire license notice for the JavaScript code in
 *          this page.
 */
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';
import { createIoClient } from 'redux-io';

const loggerMiddleware = createLogger();

const store = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    reduxReactRouter({ createHistory })
)(createStore)(rootReducer, {});

createIoClient('http://localhost:3000', store);

export default store;
