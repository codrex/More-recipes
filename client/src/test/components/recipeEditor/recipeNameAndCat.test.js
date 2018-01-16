/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJSON from 'enzyme-to-json';
import {
  PureRecipeNameAndCategory
} from '../../../components/pages/RecipeEditor/RecipeNameAndCategory';


const props = {
  handleSubmit: jest.fn(),
  clearValidationError: jest.fn(),
  recipe: {},
  updateName: jest.fn(),
  updateCategory: jest.fn(),
  validationError: {},
  name: '',
  loading: false,
};

describe('Recipe name and category component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PureRecipeNameAndCategory {...props} />);
  });
  test('expected to match snapshot', () => {
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });

  test('expected to match snapshot when name field has focus', () => {
    component.find('Form').find('#recipeName').simulate('focus');
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });

  test('expected to match snapshot when name field is blurred', () => {
    component.find('Form').find('#recipeName').simulate('blur');
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });
});

