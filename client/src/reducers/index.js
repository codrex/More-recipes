import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer, tokenReducer } from './userReducers';
import { createOrModifyRecipeReducer,
        newRecipeReducer, recipesReducer, viewRecipeReducer } from './recipeReducers';
import { ajaxReducer, ajaxErrorReducer, ajaxSuccessReducer,
         ajaxRedirectReducer } from './ajaxReducer';
import * as initialState from './initialState';


const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  ajaxCall: ajaxReducer,
  ajaxError: ajaxErrorReducer,
  ajaxSuccess: ajaxSuccessReducer,
  recipe: createOrModifyRecipeReducer,
  newRecipe: newRecipeReducer,
  redirectUrl: ajaxRedirectReducer,
  recipes: recipesReducer,
  token: tokenReducer,
  selectedRecipe: viewRecipeReducer,
  initialState
});

export default rootReducer;
