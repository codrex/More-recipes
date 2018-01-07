import React from 'react';
import toJson from 'enzyme-to-json';
import { PureCreatedRecipes } from '../../../components/pages/CreatedRecipes';

const props = {
  getCreatedRecipes: jest.fn(),
  createdRecipes: [{
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
  test('render as expected ', () => {
    const wrapper = shallow(<PureCreatedRecipes {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
