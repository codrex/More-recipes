/* eslint-disable react/jsx-filename-extension */
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
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PureCreateRecipe {...props} />);
  });

  test('expected to match snapshot', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test('expected to match snapshot when recipe is created', () => {
    wrapper.setProps({ message: RECIPE_ADDED });
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test('should call createRecipe when postRecipe is clicked', () => {
    const tree = toJson(wrapper);
    wrapper.instance().postRecipe();
    expect(props.createRecipe).toBeCalled();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
