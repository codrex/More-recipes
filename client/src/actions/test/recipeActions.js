import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import initailState from '../../reducers/initialState';
import * as actions from '../recipeActions';
import * as actionTypes from '../actions';

// mocking http request
const nockMocker = (path, payloadData, reqType, statusCode) => {
  const scope = nock('http://127.0.0.1:8000/', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
    }
  })[reqType](path)
    .reply(statusCode, payloadData);
  return scope;
};
// STORE MOCK
const mockStore = (state) => {
  const store = configureMockStore([thunk]);
  return store(state);
};
// ACTION CREATOR TEST
describe('Unit test for recipe actions:: ', () => {
  it('expect NEW_RECIPE action type to be returned', () => {
    const payload = {};
    const newRecipe = {
      type: actionTypes.NEW_RECIPE,
      payload
    };
    expect(actions.newRecipe(payload)).contain(newRecipe);
  });
  it('expect MODIFIED_RECIPE action type to be returned', () => {
    const payload = {};
    const modifiedRecipe = {
      type: actionTypes.MODIFIED_RECIPE,
      payload
    };
    expect(actions.modifiedRecipe(payload)).contain(modifiedRecipe);
  });
  it('expect MODIFIED_RECIPE action type to be returned', () => {
    const payload = {};
    const modifiedRecipe = {
      type: actionTypes.MODIFIED_RECIPE,
      payload
    };
    expect(actions.modifiedRecipe(payload)).contain(modifiedRecipe);
  });
  it('expect RECIPE_TO_MODIFY action type to be returned', () => {
    const recipe = {};
    const recipeToModify = {
      type: actionTypes.RECIPE_TO_MODIFY,
      recipe
    };
    expect(actions.recipeToModify(recipe)).contain(recipeToModify);
  });
  it('expect GET_TOP_RECIPES action type to be returned', () => {
    const payload = {};
    const gotTopRecipes = {
      type: actionTypes.GET_TOP_RECIPES,
      payload
    };
    expect(actions.gotTopRecipes(payload)).contain(gotTopRecipes);
  });
  it('expect DELETE_RECIPE action type to be returned', () => {
    const payload = {};
    const afterDeleteRecipe = {
      type: actionTypes.DELETE_RECIPE,
      payload
    };
    expect(actions.afterDeleteRecipe(payload)).contain(afterDeleteRecipe);
  });
  it('expect AFTER_REVIEW action type to be returned', () => {
    const payload = {};
    const afterReview = {
      type: actionTypes.AFTER_REVIEW,
      payload
    };
    expect(actions.afterReview(payload)).contain(afterReview);
  });
  it('expect AFTER_VOTE action type to be returned', () => {
    const payload = {};
    const afterVote = {
      type: actionTypes.AFTER_VOTE,
      payload
    };
    expect(actions.afterVote(payload)).contain(afterVote);
  });
  it('expect TOGGLE_FAV action type to be returned', () => {
    const payload = {};
    const afterToggleFav = {
      type: actionTypes.TOGGLE_FAV,
      payload
    };
    expect(actions.afterToggleFav(payload)).contain(afterToggleFav);
  });
  it('expect GET_ALL_RECIPES action type to be returned', () => {
    const payload = {};
    const gotAllRecipes = {
      type: actionTypes.GET_ALL_RECIPES,
      payload
    };
    expect(actions.gotAllRecipes(payload)).contain(gotAllRecipes);
  });
  it('expect GET_RECIPE action type to be returned', () => {
    const payload = {};
    const gotRecipe = {
      type: actionTypes.GOT_RECIPE,
      payload
    };
    expect(actions.gotRecipe(payload)).contain(gotRecipe);
  });
  it('expect FIND_RECIPE action type to be returned', () => {
    const payload = {};
    const gotFindRecipe = {
      type: actionTypes.FIND_RECIPES,
      payload
    };
    expect(actions.gotFindRecipe(payload)).contain(gotFindRecipe);
  });
  it('expect UPDATE_INGREDIENTS action type to be returned', () => {
    const ingredient = {};
    const updateIngredients = {
      type: actionTypes.UPDATE_INGREDIENTS,
      ingredient
    };
    expect(actions.updateIngredients(ingredient)).contain(updateIngredients);
  });
  it('expect UPDATE_DIRECTIONS action type to be returned', () => {
    const direction = {};
    const updateDirections = {
      type: actionTypes.UPDATE_DIRECTIONS,
      direction
    };
    expect(actions.updateDirections(direction)).contain(updateDirections);
  });
  it('expect UPDATE_RECIPE_NAME action type to be returned', () => {
    const name = "";
    const updateName = {
      type: actionTypes.UPDATE_RECIPE_NAME,
      name
    };
    expect(actions.updateName(name)).contain(updateName);
  });
  it('expect UPDATE_RECIPE_IMAGE action type to be returned', () => {
    const image = "";
    const updateImage = {
      type: actionTypes.UPDATE_RECIPE_IMAGE,
      image
    };
    expect(actions.updateImage(image)).contain(updateImage);
  });
  it('expect UPDATE_CATEGORY action type to be returned', () => {
    const category = {};
    const updateCategory = {
      type: actionTypes.UPDATE_CATEGORY,
      category
    };
    expect(actions.updateCategory(category)).contain(updateCategory);
  });
  it('expect UPDATE_ALL_RECIPE_FIELD action type to be returned', () => {
    const all = {};
    const updateAllRecipeField = {
      type: actionTypes.UPDATE_ALL_RECIPE_FIELD,
      ...all
    };
    expect(actions.updateAllRecipeField(all)).contain(updateAllRecipeField);
  });
});
// THUNK TEST
describe('Test thunks:: expect request to be successful', () => {
  const setup = (url, reqType, state) => {
    const payload = {
      status: 'success',
      recipe: {
        name: 'recipe',
        category: 'lunch',
        ingredients: ['rice'],
        directions: ['wash the rice']
      }
    };
    const scope = nockMocker(url, payload, reqType, 200);
    // mocking store
    const store = mockStore(state);
    return {
      payload,
      store,
      scope
    };
  };

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.NEW_RECIPE} and
    END_AJAX_REQUEST actions on successful recipe creation`, () => {
      const {
        payload,
        store,
        scope
      } = setup('/api/v1/recipes', 'post', initailState.Recipe);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: actionTypes.NEW_RECIPE, payload },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.createRecipe(payload.recipe))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

    it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.MODIFIED_RECIPE} and
  END_AJAX_REQUEST actions on recipe modification`, () => {
      const { payload, store, scope } = setup('/api/v1/recipes/1', 'put', initailState.Recipe);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: actionTypes.MODIFIED_RECIPE, payload },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.modifyRecipe({ id: 1, ...payload.recipe }))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.GET_ALL_RECIPES} and
  END_AJAX_REQUEST action on successful login`, () => {
      const { payload, store, scope } = setup('/api/v1/recipes?limit=10&page=1', 'get', initailState.Recipes);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: actionTypes.GET_ALL_RECIPES, payload },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.getAllRecipes(1))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.GET_TOP_RECIPES} and
  END_AJAX_REQUEST action on successful login`, () => {
      const { payload, store, scope } = setup('/api/v1/recipes?sort=upvotes&order=ascending&limit=10&page=1', 'get', initailState.Recipes);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: actionTypes.GET_TOP_RECIPES, payload },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.getTopRecipes(1))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.GET_REVIEWS} and
    END_AJAX_REQUEST action when get recipe reviews action creator is called`, () => {
        const { payload, store, scope } = setup('/api/v1/recipes/1/reviews?&limit=10&page=1',
         'get', initailState.recipe.reviews);
        const expectedActions = [
          { type: 'BEGIN_AJAX_REQUEST', loading: false },
          { type: actionTypes.GET_REVIEWS, payload },
          { type: 'END_AJAX_REQUEST',
            response: { msg: "", success: true } },
        ];
        return store.dispatch(actions.getReviews(1, 1))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
   it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.AFTER_REVIEW} and
  END_AJAX_REQUEST action on after a review is posted`, () => {
      const { payload, store, scope } = setup('/api/v1/recipes/1/reviews', 'post', initailState.Recipe);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        { type: actionTypes.AFTER_REVIEW, payload },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.postReview(1, 'hello'))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.AFTER_VOTE} and
  END_AJAX_REQUEST action on successful login`, () => {
      const { payload, store, scope } = setup('/api/v1/recipes/1/vote?up=true', 'put', initailState.Recipe);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        { type: actionTypes.AFTER_VOTE, payload },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.vote(1, 'up', true))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.TOGGLE_FAV} and
  END_AJAX_REQUEST action on successful login`, () => {
      const { payload, store, scope } = setup('/api/v1/users/recipe', 'post', initailState.Recipe);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        { type: actionTypes.TOGGLE_FAV, payload },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.toggleFav(1))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.DELETE_RECIPE} and
  END_AJAX_REQUEST action on successful login`, () => {
      const { payload, store, scope } = setup('/api/v1/recipes/1', 'delete', initailState.Recipe);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: actionTypes.DELETE_RECIPE, payload, recipeIndex: 12 },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.deleteRecipe(1, 12))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.FIND_RECIPES} and
  END_AJAX_REQUEST action on successful login`, () => {
      const searchTerm = 'term';
      const { payload, store, scope } = setup(`/api/v1/recipes?search=${searchTerm}`
        , 'get', initailState.Recipes);
      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: actionTypes.FIND_RECIPES, payload },
        { type: 'END_AJAX_REQUEST',
          response: { msg: "", success: true } },
      ];
      return store.dispatch(actions.findRecipes(searchTerm))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
});
describe('Test thunks:: when 400 is return from server', () => {
  const recipe = {
    name: 'recipe',
    category: 'lunch',
    ingredients: ['rice'],
    directions: ['wash the rice']
  };
  const setup = (url, reqType, state, statusCode) => {
    const error = { error: 'error' };
    const scope = nockMocker(url, error, reqType, statusCode);
    // mocking store
    const store = mockStore(state);
    return {
      error,
      store,
      scope
    };
  };

  it('should return when recipe name is invalid', () => {
    const { store, scope } = setup('/api/v1/recipes', 'post', initailState.Recipe, 400);
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      name: ''
    }))).eql(undefined);
  });
  it('should return when recipe category is invalid', () => {
    const { store, scope } = setup('/api/v1/recipes', 'post', initailState.Recipe, 400);
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      category: ''
    }))).eql(undefined);
  });
  it('should return when recipe directions is invalid', () => {
    const { store, scope } = setup('/api/v1/recipes', 'post', initailState.Recipe, 400);
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      directions: undefined
    }))).eql(undefined);
  });
  it('should return when recipe directions is invalid', () => {
    const { store, scope } = setup('/api/v1/recipes', 'post', initailState.Recipe, 400);
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      ingredients: undefined
    }))).eql(undefined);
  });
});

