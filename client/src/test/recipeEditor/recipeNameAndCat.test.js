import React from 'react';
import toJSON from 'enzyme-to-json';
import { PureRecipeNameAndCategory } from '../../components/pages/recipeEditor/recipeNameAndCategory/recipeNameAndCategory';


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
  test('render as expected when component is mounted', () => {
    const component = shallow(
      <PureRecipeNameAndCategory {...props} />);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when name field has focus', () => {
    const component = shallow(
      <PureRecipeNameAndCategory {...props} />);
    component.find('Form').find('#recipeName').simulate('focus');
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when name field has blur', () => {
    const component = shallow(
      <PureRecipeNameAndCategory {...props} />);
    component.find('Form').find('#recipeName').simulate('blur');
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });
});

