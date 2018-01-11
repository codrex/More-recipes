import * as actions from '../../../actions/recipeActions';
import * as actionTypes from '../../../actions/actions';

// ACTION CREATOR TEST
describe('Recipe action creators ', () => {
  it('expect NEW_RECIPE action type to be returned', () => {
    const payload = {};
    const newRecipe = {
      type: actionTypes.NEW_RECIPE,
      payload
    };
    expect(actions.newRecipe(payload)).toMatchObject(newRecipe);
  });
  it('expect MODIFIED_RECIPE action type to be returned', () => {
    const payload = {};
    const modifiedRecipe = {
      type: actionTypes.MODIFIED_RECIPE,
      payload
    };
    expect(actions.modifiedRecipe(payload)).toMatchObject(modifiedRecipe);
  });
  it('expect MODIFIED_RECIPE action type to be returned', () => {
    const payload = {};
    const modifiedRecipe = {
      type: actionTypes.MODIFIED_RECIPE,
      payload
    };
    expect(actions.modifiedRecipe(payload)).toMatchObject(modifiedRecipe);
  });

  it('expect GET_TOP_RECIPES action type to be returned', () => {
    const payload = {};
    const gotTopRecipes = {
      type: actionTypes.GET_TOP_RECIPES,
      payload
    };
    expect(actions.gotTopRecipes(payload)).toMatchObject(gotTopRecipes);
  });
  it('expect DELETE_RECIPE action type to be returned', () => {
    const payload = {};
    const afterDeleteRecipe = {
      type: actionTypes.DELETE_RECIPE,
      payload
    };
    expect(actions.afterDeleteRecipe(payload)).toMatchObject(afterDeleteRecipe);
  });
  it('expect AFTER_REVIEW action type to be returned', () => {
    const payload = {};
    const afterReview = {
      type: actionTypes.AFTER_REVIEW,
      payload
    };
    expect(actions.afterReview(payload)).toMatchObject(afterReview);
  });
  it('expect AFTER_VOTE action type to be returned', () => {
    const payload = {};
    const afterVote = {
      type: actionTypes.AFTER_VOTE,
      payload
    };
    expect(actions.afterVote(payload)).toMatchObject(afterVote);
  });
  it('expect TOGGLE_FAV action type to be returned', () => {
    const payload = {};
    const afterToggleFav = {
      type: actionTypes.TOGGLE_FAV,
      payload
    };
    expect(actions.afterToggleFav(payload)).toMatchObject(afterToggleFav);
  });
  it('expect GET_ALL_RECIPES action type to be returned', () => {
    const payload = {};
    const gotAllRecipes = {
      type: actionTypes.GET_ALL_RECIPES,
      payload
    };
    expect(actions.gotAllRecipes(payload)).toMatchObject(gotAllRecipes);
  });
  it('expect GET_RECIPE action type to be returned', () => {
    const payload = {};
    const gotRecipe = {
      type: actionTypes.GOT_RECIPE,
      payload
    };
    expect(actions.gotRecipe(payload)).toMatchObject(gotRecipe);
  });
  it('expect FIND_RECIPE action type to be returned', () => {
    const payload = {};
    const gotFindRecipe = {
      type: actionTypes.FIND_RECIPES,
      payload
    };
    expect(actions.gotFindRecipe(payload)).toMatchObject(gotFindRecipe);
  });
  it('expect UPDATE_INGREDIENTS action type to be returned', () => {
    const ingredient = {};
    const updateIngredients = {
      type: actionTypes.UPDATE_INGREDIENTS,
      ingredient
    };
    expect(actions.updateIngredients(ingredient)).toMatchObject(updateIngredients);
  });
  it('expect UPDATE_DIRECTIONS action type to be returned', () => {
    const direction = {};
    const updateDirections = {
      type: actionTypes.UPDATE_DIRECTIONS,
      direction
    };
    expect(actions.updateDirections(direction)).toMatchObject(updateDirections);
  });
  it('expect UPDATE_RECIPE_NAME action type to be returned', () => {
    const name = '';
    const updateName = {
      type: actionTypes.UPDATE_RECIPE_NAME,
      name
    };
    expect(actions.updateName(name)).toMatchObject(updateName);
  });
  it('expect UPDATE_RECIPE_IMAGE action type to be returned', () => {
    const image = '';
    const updateImage = {
      type: actionTypes.UPDATE_RECIPE_IMAGE,
      image
    };
    expect(actions.updateImage(image)).toMatchObject(updateImage);
  });
  it('expect UPDATE_CATEGORY action type to be returned', () => {
    const category = {};
    const updateCategory = {
      type: actionTypes.UPDATE_CATEGORY,
      category
    };
    expect(actions.updateCategory(category)).toMatchObject(updateCategory);
  });
});
