import React from 'react';
import AddItems from '../addItems/addItems';
import toJson from 'enzyme-to-json';

const props = {
  handleSubmit: jest.fn(),
  placeholder: '',
  name: 'ingredient',
  initialize: jest.fn(),
  clearValidationError: jest.fn(),
  externalError: false,
  handleSubmit: jest.fn(),
  items: [],
  directions: true,
  name: '',
  placeholder: '',
  sendItemsToStore: jest.fn(),
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
});
