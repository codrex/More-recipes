import React from 'react';
import toJson from 'enzyme-to-json';
import { PureProfile } from '../../../components/pages/Profile';

const props = {
  actions: {
    getProfile: jest.fn(),
    update: jest.fn(),
    currentRecipe: jest.fn(),
    deleteRecipe: jest.fn(),
    removeFromFav: jest.fn(),
    resetSuccess: jest.fn(),
    getCreatedRecipes: jest.fn(),
    resetPageCount: jest.fn(),
    resetRecipes: jest.fn()

  },
  recipes: [],
  history: { push: jest.fn() },
  loading: false,
  success: false,
  user: {
    fullname: 'test user',
    favRecipes: [{
      name: 'recipe',
      category: '',
      views: 1,
      upVotes: 1,
      downVotes: 1,
      recipeId: 1,
    }],
    createdRecipes: [{
      name: 'recipe',
      category: '',
      views: 1,
      upVotes: 1,
      downVotes: 1,
      recipeId: 1,
    }],
  },
};

describe('Profile Page component ', () => {
  test('to match empty snapshot ', () => {
    const wrapper = mount(<PureProfile {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});

