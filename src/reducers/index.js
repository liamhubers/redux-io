/**
 * Root reducer.
 * @module reducers/index
 * @author Flex Appeal
 * @licstart The following is the entire license notice for the JavaScript
 *           code in this page.
 *
 * Copyright (C) 2015 Flex Appeal. All rights reserved.
 *
 * @licence The above is the entire license notice for the JavaScript code in
 *          this page.
 */
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import test from './test';

// Combine reducers
const rootReducer = combineReducers({
  router: routerStateReducer,
  test,
});

export default rootReducer;
