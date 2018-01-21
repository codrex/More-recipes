/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureCreatedRecipes } from '../../../components/pages/CreatedRecipes';

const props = {
  getCreatedRecipes: jest.fn(),
  createdRecipes: [{
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

describe('TopRecipes page component ', () => {
  test('expected to match snapshot ', () => {
    const wrapper = shallow(<PureCreatedRecipes {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
