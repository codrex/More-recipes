import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createUserReducer } from './userReducers';

const rootReducer = combineReducers({
  user: createUserReducer,
  form: formReducer,
});

export default rootReducer;
