/**
 * Root container.
 * @module containers/Root
 * @author Flex Appeal
 * @licstart The following is the entire license notice for the JavaScript
 *           code in this page.
 *
 * Copyright (C) 2015 Flex Appeal. All rights reserved.
 *
 * @licence The above is the entire license notice for the JavaScript code in
 *          this page.
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import { ReduxRouter } from 'redux-router';
import store from '../configureStore';

import Container from './Container';
import Index from './Index';

import '../assets/less/app.less';

// Render app
render(
  <Provider store={store}>
      <ReduxRouter>
        <Route path="/" component={Container}>
          <Route path="/" component={Index} />
        </Route>
      </ReduxRouter>
  </Provider>,
  document.getElementById('root')
);
