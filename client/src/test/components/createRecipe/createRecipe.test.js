import React from 'react';
import toJson from 'enzyme-to-json';
import { PureCreateRecipe } from '../../../components/pages/CreateRecipe';
import { RECIPE_ADDED } from '../../../constants';

const props = {
  resetRecipe: jest.fn(),
  message: 'recipe modified',
  getRecipe: jest.fn(),
  createRecipe: jest.fn(),
  resetSuccessMessage: jest.fn(),
  loading: false,
  statusCode: 200,
  recipe: {
    name: '',
    category: '',
    views: 0,
    upVotes: 0,
    downVotes: 0,
    image: {},
  },
  history: { push: jest.fn() },
};

describe('Create Recipe page component ', () => {
  test('render as expected when page is mounted', () => {
    const wrapper = shallow(<PureCreateRecipe {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test('render as expected when recipe was created', () => {
    const wrapper = shallow(<PureCreateRecipe {...props} />);
    wrapper.setProps({ message: RECIPE_ADDED });
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
