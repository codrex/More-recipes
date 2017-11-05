import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './userReducers';
import { recipesReducer, recipeReducer } from './recipeReducers';
import { ajaxReducer, ajaxRedirectReducer } from './ajaxReducer';
import authReducer from './authReducer';
import * as initialState from './initialState';


const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  networkRequest: ajaxReducer,
  recipe: recipeReducer,
  recipes: recipesReducer,
  redirectUrl: ajaxRedirectReducer,
  auth: authReducer,
  initialState
});

export default rootReducer;
