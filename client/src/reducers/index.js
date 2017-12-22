import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducers';
import {
  recipesReducer,
  recipeReducer,
  recipeValidationError,
  favoriteRecipesReducer
} from './recipeReducers';
import { ajaxReducer, ajaxRedirectReducer } from './ajaxReducer';
import authReducer from './authReducer';
import pageCountReducer from './pageCount';
import * as initialState from './initialState';
import statusCodeReducer from './statusCodeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  networkRequest: ajaxReducer,
  recipe: recipeReducer,
  recipes: recipesReducer,
  pageCount: pageCountReducer,
  redirectUrl: ajaxRedirectReducer,
  auth: authReducer,
  recipeValidationError,
  favoriteRecipes: favoriteRecipesReducer,
  currentStatusCode: statusCodeReducer,
  initialState
});

export default rootReducer;
