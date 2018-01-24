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
  name: 'beans soup',
  loading: false,
};

describe('Recipe name and category component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PureRecipeNameAndCategory {...props} />);
  });
  test('expected to render recipe name and ingredient form', () => {
    const tree = toJSON(component);
    expect(component.find('Form').children().length).toBe(2);
    expect(component.find('Field').length).toBe(1);
    expect(component.find('Select').length).toBe(1);
    expect(tree).toMatchSnapshot();
  });

  test('should clear validation error when name field has focus', () => {
    component.find('Form').find('#recipeName').simulate('focus');
    const tree = toJSON(component);
    expect(props.clearValidationError).toHaveBeenCalledWith({ name: '' });
    expect(tree).toMatchSnapshot();
  });

  test('expected to update name when name field is blurred', () => {
    component.find('Form').find('#recipeName').simulate('blur');
    const tree = toJSON(component);
    expect(props.updateName).toHaveBeenCalledWith(props.name);
    expect(tree).toMatchSnapshot();
  });
});

