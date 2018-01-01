import React from 'react';
import toJson from 'enzyme-to-json';
import AddItems from '../../components/pages/recipeEditor/addItems';
import { PureInput } from '../../components/common/form';

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
  // Component: PureInput
};

describe('Add items component ', () => {
  test('render as expected when directions is passed as props', () => {
    const component = shallow(
      <AddItems {...props} />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when form is submitted', () => {
    const component = shallow(
      <AddItems {...props} ingredients />
    );
    component.find('Form').simulate('submit');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when there is external validation error', () => {
    const component = shallow(
      <AddItems {...props} ingredients />
    );
    component.setProps({ externalError: ['error'] });
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when name field has focus', () => {
    const component = shallow(
      <AddItems {...props} ingredients />
    );
    component.find('Field').simulate('focus');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
