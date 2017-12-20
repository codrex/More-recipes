import { expect } from 'chai';
import reducer from '../userReducers';
import initialState from '../initialState';
import {
  LOGIN,
  SIGNUP,
  GOT_USER_PROFILE,
  UPDATE_USER_PROFILE,
  DELETE_RECIPE,
  TOGGLE_FAV
} from '../../actions/actions';

let state = {};

describe('Testing user reducers', () => {
  beforeEach(() => {
    state = initialState.user;
  });
  it('should return initialState when user reducer is call without args', () => {
    expect(reducer()).eql(state);
  });
  it('should return a newState for action type LOGIN', () => {
    const action = {
      payload: {
        user: {
          username: 'username',
          fullname: 'fullname',
          email: 'email@email.com'
        }
      },
      type: LOGIN
    };
    const user = reducer(state, action);
    expect(user).eql({ ...state, ...action.payload.user });
    expect(user).to.not.eql(state);
  });
  it('should return a newState for action type SIGNUP', () => {
    const action = {
      payload: {
        user: {
          username: 'username',
          fullname: 'fullname',
          email: 'email@email.com'
        }
      },
      type: SIGNUP
    };
    const user = reducer(state, action);
    expect(user).eql({ ...state, ...action.payload.user });
    expect(user).to.not.eql(state);
  });
  it('should return a newState for action type GOT_USER_PROFILE', () => {
    const action = {
      payload: {
        user: {
          email: 'email@email.com',
          username: 'username',
          fullname: 'fullname fullname fullname',
          profilePix: 'UNKNOWN',
          favRecipes: [],
          createdRecipes: [
            {
              id: 43,
              recipeName: 'koj',
              category: 'ojpjp',
              ingredients: ['pkpk'],
              directions: ['pkpk'],
              upVotes: 0,
              downVotes: 0,
              views: 0,
              OwnerId: 1,
              UserId: 1,
            },
          ]
        }
      },
      type: GOT_USER_PROFILE
    };
    const user = reducer(state, action);
    expect(user).eql({ ...state, ...action.payload.user });
    expect(user).to.not.eql(state);
  });
  it('should return a newState for action type UPDATE_USER_PROFILE', () => {
    const action = {
      payload: {
        user: {
          email: 'email@email.com',
          username: 'username',
          fullname: 'fullname fullname fullname',
          profilePix: 'UNKNOWN',
        }
      },
      type: UPDATE_USER_PROFILE
    };
    const user = reducer(state, action);
    expect(user).eql({ ...state, ...action.payload.user });
    expect(user).to.not.eql(state);
  });

  it('should return a newState for action type TOGGLE_FAV when user added a favorite recipe', () => {
    const action = {
      payload: {
        favRecipe: {
          added: true,
          id:1,
          recipe: {id:1}
        }
      },
      type: TOGGLE_FAV
    };
    const user = reducer(state, action);
    expect(user).eql({ ...state,favRecipes:[{id:1}] });
    expect(user.favRecipes.length).eql(1);
    expect(user).to.not.eql(state);
  });
  it('should return a newState for action type TOGGLE_FAV when user removed a favorite recipe', () => {
    const action = {
      payload: {
        favRecipe: {
          added: false,
          id:1
        }
      },
      type: TOGGLE_FAV
    };
    const user = reducer(state, action);
    expect(user).eql({ ...state,favRecipes:[] });
    expect(user.favRecipes.length).eql(0);
    expect(user).to.not.equal(state);
  });
});

