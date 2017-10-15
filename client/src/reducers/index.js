import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer, tokenReducer } from './userReducers';
import { recipesReducer, recipeReducer } from './recipeReducers';
import { ajaxReducer, ajaxErrorReducer, ajaxSuccessReducer,
         ajaxRedirectReducer } from './ajaxReducer';
import * as initialState from './initialState';


const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  ajaxCall: ajaxReducer,
  ajaxError: ajaxErrorReducer,
  ajaxSuccess: ajaxSuccessReducer,
  recipe: recipeReducer,
  recipes: recipesReducer,
  redirectUrl: ajaxRedirectReducer,
  token: tokenReducer,
  initialState
});

export default rootReducer;
