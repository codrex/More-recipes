import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers/index';

const configureStore = () => {
  return applyMiddleware(ReduxPromise)(createStore)(rootReducer);
};
console.log(configureStore(), applyMiddleware(ReduxPromise));
export default configureStore;
