import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './userReducers';
import { createOrModifyRecipeReducer, newRecipeReducer } from './recipeReducers';
import { ajaxReducer, ajaxErrorReducer, ajaxSuccessReducer } from './ajaxReducer';
import * as initialState from './initialState';


const rootReducer = combineReducers({
  User: userReducer,
  form: formReducer,
  ajaxCall: ajaxReducer,
  ajaxError: ajaxErrorReducer,
  ajaxSuccess: ajaxSuccessReducer,
  recipe: createOrModifyRecipeReducer,
  newRecipe: newRecipeReducer,
  initialState
});

export default rootReducer;
