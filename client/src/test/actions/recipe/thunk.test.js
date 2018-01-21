import initialState from '../../../reducers/initialState';
import * as actions from '../../../actions/recipeActions';
import * as actionTypes from '../../../actions/actions';
import { LIMIT, REVIEW_LIMIT } from '../../../constants';
import { setup, recipe, endAjaxReq } from './recipeMock';


// THUNK TEST
describe('Recipe thunks', () => {
  it(`should return BEGIN_AJAX_REQUEST, NEW_RECIPE and
    END_AJAX_REQUEST actions when create recipe request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/recipes', 'post', initialState.Recipe, 200);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: actionTypes.NEW_RECIPE, payload },
        endAjaxReq(200)
      ];

      return store.dispatch(actions.createRecipe(payload.recipe))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, MODIFIED_RECIPE and
  END_AJAX_REQUEST actions when modify recipe request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/recipes/1', 'put', initialState.Recipe);
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true
        },
        {
          type: actionTypes.MODIFIED_RECIPE,
          payload
        },
        endAjaxReq(200)
      ];

      return store.dispatch(actions.modifyRecipe({ id: 1, ...payload.recipe }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, GET_ALL_RECIPES and
  END_AJAX_REQUEST action when get all recipes request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/recipes?limit=${LIMIT}&page=1`, 'get', initialState.Recipes
      );
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true
        },
        {
          type: actionTypes.GET_ALL_RECIPES,
          payload
        },
        endAjaxReq(200)
      ];

      return store.dispatch(actions.getAllRecipes(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, GET_TOP_RECIPES and
  END_AJAX_REQUEST action when get top recipes request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/recipes?sort=upvotes&order=ascending&limit=${LIMIT}&page=1`,
        'get',
        initialState.Recipes
      );
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true },
        {
          type: actionTypes.GET_TOP_RECIPES,
          payload
        },
        endAjaxReq(200)
      ];
      return store.dispatch(actions.getTopRecipes(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, GET_REVIEWS and
    END_AJAX_REQUEST action when get recipe reviews
    request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/recipes/1/reviews?&limit=${REVIEW_LIMIT}&page=1`,
        'get',
        initialState.recipe.reviews
      );
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: false
        },
        {
          type: actionTypes.GET_REVIEWS,
          payload
        },
        endAjaxReq(200)
      ];
      return store.dispatch(actions.getReviews(1, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, AFTER_REVIEW and
  END_AJAX_REQUEST action after a review was posted`, () => {
      const {
        payload,
        store
      } = setup(
        `/api/v1/recipes/1/reviews?limit=${REVIEW_LIMIT}`,
        'post', initialState.Recipe
      );
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: false },
        {
          type: actionTypes.AFTER_REVIEW,
          payload
        },
        endAjaxReq(200)
      ];

      return store.dispatch(actions.postReview(1, 'hello'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, AFTER_VOTE and
  END_AJAX_REQUEST action when recipe upvote request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/recipes/1/vote?up=true', 'put', initialState.Recipe);
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: false },
        {
          type: actionTypes.AFTER_VOTE,
          payload
        },
        endAjaxReq(200)
      ];
      return store.dispatch(actions.vote(1, 'up', true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, TOGGLE_FAV and
  END_AJAX_REQUEST action after add to favorite request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/users/recipe', 'post', initialState.Recipe);
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: false },
        {
          type: actionTypes.TOGGLE_FAV,
          payload
        },
        endAjaxReq(200)
      ];
      return store.dispatch(actions.toggleFav(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, DELETE_RECIPE and
  END_AJAX_REQUEST actions when delete recipe request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/recipes/1', 'delete', initialState.Recipe);
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true
        },
        {
          type: actionTypes.DELETE_RECIPE,
          payload,
          recipeIndex: 12
        },
        endAjaxReq(200)
      ];
      return store.dispatch(actions.deleteRecipe(1, 12))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, FIND_RECIPES and
  END_AJAX_REQUEST actions when recipe search request is successful`, () => {
      const searchTerm = 'term';
      const {
        payload,
        store,
      } = setup(
        `/api/v1/recipes?search=${searchTerm}&limit=${LIMIT}&page=1`,
        'get',
        initialState.Recipes
      );
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true },
        {
          type: actionTypes.FIND_RECIPES,
          payload
        },
        endAjaxReq(200)
      ];
      return store.dispatch(actions.findRecipes(searchTerm, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, GET_FAVOURITE_RECIPES and
    END_AJAX_REQUEST actions when get favourite recipes
    request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/users/recipes/favourite?limit=${LIMIT}&page=1`,
        'get',
        initialState.Recipes
      );
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true },
        {
          type: actionTypes.GET_FAVOURITE_RECIPES,
          payload
        },
        endAjaxReq(200)
      ];
      return store.dispatch(actions.getFavouriteRecipes(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, GET_CREATED_RECIPES and
    END_AJAX_REQUEST actions when get created
    recipes request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/users/recipes/created?&limit=${LIMIT}&page=1`,
        'get',
        initialState.Recipes
      );
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true },
        {
          type: actionTypes.GET_CREATED_RECIPES,
          payload
        },
        endAjaxReq(200)
      ];
      return store.dispatch(actions.getCreatedRecipes(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST END_AJAX_REQUEST actions
    when recipe review request is unsuccessful`, () => {
      const {
        store,
      } = setup(
        `/api/v1/recipes/1/reviews?limit=${REVIEW_LIMIT}`,
        'post', undefined, 400
      );
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: false
        },
        {
          response: {
            success: false,
            msg: undefined,
            code: 400
          },
          type: 'END_AJAX_REQUEST',
        },
      ];
      return store.dispatch(actions.postReview(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST END_AJAX_REQUEST actions
    when get recipe request is unsuccessful`, () => {
      const {
        store,
      } = setup('/api/v1/recipes/1', 'get', initialState.Recipe, 404);
      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true
        },
        {
          response: {
            success: false,
            msg: undefined,
            code: 404
          },
          type: 'END_AJAX_REQUEST',
        },
      ];
      return store.dispatch(actions.getRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it('should return when recipe category is invalid', () => {
    const { store } = setup(
      '/api/v1/recipes', 'post',
      initialState.Recipe, 400
    );
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      category: ''
    }))).toBeUndefined();
  });

  it('should return when recipe directions is invalid', () => {
    const { store } = setup(
      '/api/v1/recipes',
      'post',
      initialState.Recipe,
      400
    );
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      directions: undefined
    }))).toBeUndefined();
  });

  it('should return when recipe directions is invalid', () => {
    const { store } = setup(
      '/api/v1/recipes',
      'post',
      initialState.Recipe,
      400
    );
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      ingredients: undefined
    }))).toBeUndefined();
  });
});
