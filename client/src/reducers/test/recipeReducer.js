import { expect } from 'chai';
import { recipeReducer, recipesReducer } from '../recipeReducers';
import initialState from '../initialState';
import {
  UPDATE_DIRECTIONS,
  UPDATE_INGREDIENTS,
  UPDATE_NAME_CATEGORY,
  UPDATE_ALL_RECIPE_FIELD,
  GET_ALL_RECIPES,
  GET_TOP_RECIPES,
  GET_RECIPE,
  AFTER_REVIEW,
  AFTER_VOTE,
  RECIPE_TO_MODIFY,
  CURRENT_RECIPE,
  NEW_RECIPE,
  FIND_RECIPES
} from '../../actions/actions';

let state = {};
const recipePayload = {
  Recipe: {
    id: undefined,
    recipeName: '',
    category: '',
    ingredients: [],
    directions: [],
    RecipeReviews: [],
    downVotes: 0,
    upVotes: 0,
  }
};
const recipesPayload = { Recipes: [recipePayload, recipePayload] };

describe('Testing recipe reducers', () => {
  beforeEach(() => {
    state = initialState.Recipe;
  });
  it('should return a newState for action type GET_RECIPE', () => {
    const action = {
      payload: recipePayload,
      type: GET_RECIPE
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...state, ...action.payload.Recipe });
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type AFTER_REVIEW', () => {
    const action = {
      payload: recipePayload,
      type: AFTER_REVIEW
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...state, RecipeReviews: action.payload.Recipe.RecipeReviews });
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type AFTER_VOTE', () => {
    const action = {
      payload: recipePayload,
      type: AFTER_VOTE
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...state,
      ...{
        upVotes: action.payload.Recipe.upVotes,
        downVotes: action.payload.Recipe.downVotes
      }
    });
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type CURRENT_RECIPE', () => {
    const action = {
      recipe: recipePayload.Recipe,
      type: CURRENT_RECIPE
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...state, ...action.Recipe });
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type RECIPE_TO_MODIFY', () => {
    const action = {
      recipe: recipePayload.Recipe,
      type: RECIPE_TO_MODIFY
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...state, ...action.Recipe });
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type NEW_RECIPE', () => {
    const action = {
      type: NEW_RECIPE
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql(state);
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type UPDATE_ALL_RECIPE_FIELD', () => {
    const action = {
      type: UPDATE_ALL_RECIPE_FIELD,
      all: {
        recipeName: '',
        category: '',
        ingredients: [],
        directions: [],
      }
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...{ ...state, ...action.all } });
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type UPDATE_NAME_CATEGORY', () => {
    const action = {
      type: UPDATE_NAME_CATEGORY,
      nameAndCat: {
        recipeName: '',
        category: '',
      }
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...{ ...state, ...action.nameAndCat } });
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type UPDATE_DIRECTIONS', () => {
    const action = {
      type: UPDATE_DIRECTIONS,
      direction: [90],
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...{ ...state, directions: action.direction } });
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type UPDATE_INGREDIENTS', () => {
    const action = {
      type: UPDATE_INGREDIENTS,
      ingredient: [90],
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).eql({ ...{ ...state, ingredients: action.ingredient } });
    expect(recipe).to.not.equal(state);
  });
});

describe('Testing recipes reducers', () => {
  beforeEach(() => {
    state = initialState.Recipes;
  });
  it('should return a newState for action type GET_ALL_RECIPES', () => {
    const action = {
      payload: recipesPayload,
      type: GET_ALL_RECIPES
    };
    const recipe = recipesReducer(state, action);
    expect(recipe).eql([...state, ...action.payload.Recipes]);
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type GET_TOP_RECIPES', () => {
    const action = {
      payload: recipesPayload,
      type: GET_TOP_RECIPES
    };
    const recipe = recipesReducer(state, action);
    expect(recipe).eql([...state, ...action.payload.Recipes]);
    expect(recipe).to.not.equal(state);
  });
  it('should return a newState for action type FIND_RECIPES', () => {
    const action = {
      payload: recipesPayload,
      type: FIND_RECIPES
    };
    const recipe = recipesReducer(state, action);
    expect(recipe).eql([...state, ...action.payload.Recipes]);
    expect(recipe).to.not.equal(state);
  });
});

