import React from 'react';
import AddItems from '../addItems/addItems';
import renderer from 'react-test-renderer';

const props = {
  handleSubmit: jest.fn(),
  placeholder: '',
  name: 'name',
  initialize: jest.fn(),
};

describe('Add items component ', () => {
  test('render as expected when directions is passed as props', () => {
    const component = renderer.create(
      <AddItems {...props} directions />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when ingredients is pass as props', () => {
    const component = renderer.create(
      <AddItems {...props} ingredients />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
