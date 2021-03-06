/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import {
  PureFavoriteRecipes
} from '../../../components/pages/FavouriteRecipes';

const props = {
  getFavouriteRecipes: jest.fn(),
  favouriteRecipes: [{
    name: 'cappuccino',
    category: 'drinks',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    id: 1,
    image: {},
  }],
  user: {
    id: 1,
    favRecipes: [{
      id: 1,
    }],
  },
};

describe('Favourite Recipes page component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('should render favourite recipes page', () => {
    const wrapper = shallow(<PureFavoriteRecipes {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
