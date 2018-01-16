import { recipeReducer, recipesReducer } from '../../reducers/recipeReducers';
import initialState from '../../reducers/initialState';
import {
  UPDATE_DIRECTIONS,
  UPDATE_INGREDIENTS,
  UPDATE_RECIPE_NAME,
  UPDATE_CATEGORY,
  UPDATE_ALL_RECIPE_FIELD,
  GET_ALL_RECIPES,
  GET_TOP_RECIPES,
  GOT_RECIPE,
  AFTER_REVIEW,
  AFTER_VOTE,
  NEW_RECIPE,
  FIND_RECIPES,
  UPDATE_RECIPE_IMAGE,
  DELETE_RECIPE
} from '../../actions/actions';

let state = {};
const recipePayload = {
  recipe: {
    id: undefined,
    name: '',
    category: '',
    ingredients: [],
    directions: [],
    image: '',
    downVotes: 0,
    upVotes: 0,
  }
};
const recipesPayload = { recipes: [recipePayload, recipePayload] };

describe('Testing recipe reducers', () => {
  beforeEach(() => {
    state = initialState.recipe;
  });
  it('should return a newState for action type GOT_RECIPE', () => {
    const action = {
      payload: {
        recipe: recipePayload,
      },
      type: GOT_RECIPE
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).toMatchObject({ ...state, ...action.payload.recipe });
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type AFTER_REVIEW', () => {
    const action = {
      payload: {
        reviews: [{}]
      },
      type: AFTER_REVIEW
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).toMatchObject({ ...state, reviews: [{}] });
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type AFTER_VOTE', () => {
    const action = {
      payload: recipePayload,
      type: AFTER_VOTE
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).toMatchObject({
      ...state,
      ...{
        upVotes: action.payload.recipe.upVotes,
        downVotes: action.payload.recipe.downVotes
      }
    });
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type NEW_RECIPE', () => {
    const action = {
      type: NEW_RECIPE,
      payload: {
        recipe: { ...recipePayload.recipe }
      }
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).toMatchObject(recipePayload.recipe);
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type UPDATE_ALL_RECIPE_FIELD', () => {
    const action = {
      type: UPDATE_ALL_RECIPE_FIELD,
      all: {
        name: '',
        category: '',
        ingredients: [],
        directions: [],
      }
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).toMatchObject({ ...{ ...state, ...action.all } });
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type UPDATE_RECIPE_NAME', () => {
    const action = {
      type: UPDATE_RECIPE_NAME,
      name: 'name'
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).toMatchObject({ ...state, name: action.name });
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type UPDATE_RECIPE_IMAGE', () => {
    const action = {
      type: UPDATE_RECIPE_IMAGE,
      image: 'image'
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).toMatchObject({ ...state, image: action.image });
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type UPDATE_NAME_CATEGORY', () => {
    const action = {
      type: UPDATE_CATEGORY,
      category: 'category'
    };
    const recipe = recipeReducer(state, action);
    expect(recipe).toMatchObject({ ...state, category: action.category });
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type UPDATE_DIRECTIONS', () => {
    const action = {
      type: UPDATE_DIRECTIONS,
      direction: [90],
    };
    const recipe = recipeReducer(state, action);
    expect(recipe)
      .toMatchObject({ ...{ ...state, directions: action.direction } });
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type UPDATE_INGREDIENTS', () => {
    const action = {
      type: UPDATE_INGREDIENTS,
      ingredient: [90],
    };
    const recipe = recipeReducer(state, action);
    expect(recipe)
      .toMatchObject({ ...{ ...state, ingredients: action.ingredient } });
    expect(recipe).not.toBe(state);
  });
});

describe('Testing recipes reducers', () => {
  beforeEach(() => {
    state = initialState.recipes;
  });
  it('should return a newState for action type GET_ALL_RECIPES', () => {
    const action = {
      payload: recipesPayload,
      type: GET_ALL_RECIPES
    };
    const recipes = recipesReducer(state, action);
    expect(recipes).toMatchObject([...state, ...action.payload.recipes]);
    expect(recipes).not.toBe(state);
  });
  it('should return a newState for action type GET_TOP_RECIPES', () => {
    const action = {
      payload: recipesPayload,
      type: GET_TOP_RECIPES
    };
    const recipe = recipesReducer(state, action);
    expect(recipe).toMatchObject([...state, ...action.payload.recipes]);
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type FIND_RECIPES', () => {
    const action = {
      payload: recipesPayload,
      type: FIND_RECIPES
    };
    const recipe = recipesReducer(state, action);
    expect(recipe).toMatchObject([...state, ...action.payload.recipes]);
    expect(recipe).not.toBe(state);
  });
  it('should return a newState for action type DELETE_RECIPE', () => {
    const action = { recipeIndex: 1, type: DELETE_RECIPE };
    const recipes = recipesReducer([{}, {}], action);
    expect(recipes.length).toBe(1);
    expect(recipes).not.toBe(state);
  });
});

