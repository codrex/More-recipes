import React from 'react';
import toJson from 'enzyme-to-json';
import { PureFavoriteRecipes } from '../../../components/pages/FavouriteRecipes';

const props = {
  getFavouriteRecipes: jest.fn(),
  favouriteRecipes: [{
    name: 'capachino',
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

describe('Favourite Recipes page component ', () => {
  test('render as expected ', () => {
    const wrapper = shallow(<PureFavoriteRecipes {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
