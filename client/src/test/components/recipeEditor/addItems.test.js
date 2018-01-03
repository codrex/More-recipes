import React from 'react';
import toJson from 'enzyme-to-json';
import AddItems from '../../../components/pages/RecipeEditor/AddItems';
import { PureInput } from '../../../components/common/FormElements';

const props = {
  handleSubmit: jest.fn(),
  placeholder: '',
  name: 'ingredient',
  initialize: jest.fn(),
  clearValidationError: jest.fn(),
  externalError: [],
  items: [],
  directions: true,
  sendItemsToStore: jest.fn(),
  ingredients: false,
  Component: PureInput
};

describe('Add items component ', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <AddItems {...props} />
    );
  });
  test('render as expected when directions is passed as props', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when form is submitted', () => {
    component.find('Form').simulate('submit');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when there is external validation error', () => {
    component.setProps({ externalError: ['error'] });
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when name field has focus', () => {
    component.find('Field').simulate('focus');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
