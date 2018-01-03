// import { expect } from 'chai';
import initailState from '../../reducers/initialState';
import * as actions from '../../actions/recipeActions';
import * as actionTypes from '../../actions/actions';
import { LIMIT, REVIEW_LIMIT } from '../../constants';
import { setup, recipe, endAjaxReq } from './recipeMock';


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
  it('expect UPDATE_ALL_RECIPE_FIELD action type to be returned', () => {
    const all = {};
    const updateAllRecipeField = {
      type: actionTypes.UPDATE_ALL_RECIPE_FIELD,
      ...all
    };
    expect(actions.updateAllRecipeField(all)).toMatchObject(updateAllRecipeField);
  });
});

// THUNK TEST
describe('Recipe thunks', () => {
  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.NEW_RECIPE} and
    END_AJAX_REQUEST actions when create recipe request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/recipes', 'post', initailState.Recipe, 200);

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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.MODIFIED_RECIPE} and
  END_AJAX_REQUEST actions when modify recipe request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/recipes/1', 'put', initailState.Recipe);
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.GET_ALL_RECIPES} and
  END_AJAX_REQUEST action when get all recipes request is successful`, () => {
      const {
        payload,
        store,
      } = setup(`/api/v1/recipes?limit=${LIMIT}&page=1`, 'get', initailState.Recipes);
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.GET_TOP_RECIPES} and
  END_AJAX_REQUEST action when get top recipes request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/recipes?sort=upvotes&order=ascending&limit=${LIMIT}&page=1`,
        'get',
        initailState.Recipes
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.GET_REVIEWS} and
    END_AJAX_REQUEST action when get recipe reviews request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/recipes/1/reviews?&limit=${REVIEW_LIMIT}&page=1`,
        'get',
        initailState.recipe.reviews
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.AFTER_REVIEW} and
  END_AJAX_REQUEST action on after a review is posted`, () => {
      const {
        payload,
        store,
      } = setup(`/api/v1/recipes/1/reviews?limit=${REVIEW_LIMIT}`, 'post', initailState.Recipe);
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.AFTER_VOTE} and
  END_AJAX_REQUEST action when recipe upvote request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/recipes/1/vote?up=true', 'put', initailState.Recipe);
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.TOGGLE_FAV} and
  END_AJAX_REQUEST action after add to favorite request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/users/recipe', 'post', initailState.Recipe);
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.DELETE_RECIPE} and
  END_AJAX_REQUEST actions when delete recipe request is successful`, () => {
      const {
        payload,
        store,
      } = setup('/api/v1/recipes/1', 'delete', initailState.Recipe);
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.FIND_RECIPES} and
  END_AJAX_REQUEST actions when recipe search request is successful`, () => {
      const searchTerm = 'term';
      const {
        payload,
        store,
      } = setup(
        `/api/v1/recipes?search=${searchTerm}&limit=${LIMIT}&page=1`,
        'get',
        initailState.Recipes
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
      return store.dispatch(actions.findRecipes(searchTerm))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.GET_FAVOURITE_RECIPES} and
    END_AJAX_REQUEST actions when get favourite recipes request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/users/recipes/favourite?limit=${LIMIT}&page=1`,
        'get',
        initailState.Recipes
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

  it(`should return BEGIN_AJAX_REQUEST, ${actionTypes.GET_CREATED_RECIPES} and
    END_AJAX_REQUEST actions when get created recipes request is successful`, () => {
      const {
        payload,
        store,
      } = setup(
        `/api/v1/users/recipes/created?&limit=${LIMIT}&page=1`,
        'get',
        initailState.Recipes
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
    when a request is unsuccessful`, () => {
      const {
        store,
      } = setup(`/api/v1/recipes/1/reviews?limit=${REVIEW_LIMIT}`, 'post', undefined, 400);
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
    when a request is unsuccessful`, () => {
      const {
        store,
      } = setup('/api/v1/recipes/1', 'get', initailState.Recipe, 404);
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
    const { store } = setup('/api/v1/recipes', 'post', initailState.Recipe, 400);
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      category: ''
    }))).toBeUndefined();
  });

  it('should return when recipe directions is invalid', () => {
    const { store } = setup('/api/v1/recipes', 'post', initailState.Recipe, 400);
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      directions: undefined
    }))).toBeUndefined();
  });

  it('should return when recipe directions is invalid', () => {
    const { store } = setup('/api/v1/recipes', 'post', initailState.Recipe, 400);
    expect(store.dispatch(actions.createRecipe({
      ...recipe,
      ingredients: undefined
    }))).toBeUndefined();
  });
});

