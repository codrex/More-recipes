/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureCreateRecipe } from '../../../components/pages/CreateRecipe';
import { RECIPE_ADDED } from '../../../constants';

const props = {
  resetRecipe: jest.fn(),
  message: '',
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
    id: 1
  },
  history: { push: jest.fn() },
};

describe('Create Recipe page component ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PureCreateRecipe {...props} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('expected render create recipe page', () => {
    const tree = toJson(wrapper);
    expect(wrapper.find('RecipeEditor').length).toBe(1);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test(`should navigate to recipe details page when recipe is successfully
  created `, () => {
      wrapper.setProps({ message: RECIPE_ADDED });
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(props.history.push).toHaveBeenCalledWith('/recipe/1');
      expect(tree).toBeInstanceOf(Object);
    });

  test('should post a recipe', () => {
    const tree = toJson(wrapper);
    wrapper.instance().postRecipe();
    expect(props.createRecipe).toHaveBeenCalledWith(props.recipe, RECIPE_ADDED);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
