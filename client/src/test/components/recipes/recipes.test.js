import React from 'react';
import toJson from 'enzyme-to-json';
import { PureRecipes } from '../../../components/pages/Recipes';

const props = {
  getAllRecipes: jest.fn(),
  search: jest.fn(),
  recipes: [{
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

describe('TopRecipes page component ', () => {
  test('expected to match snapshot ', () => {
    const wrapper = shallow(<PureRecipes {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
