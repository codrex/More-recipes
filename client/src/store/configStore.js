/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const configureStore = () => applyMiddleware(thunk)(createStore)(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;
