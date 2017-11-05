import React from 'react';
import AddItems from '../addItems/addItems';
import renderer from 'react-test-renderer';

describe('Add items component ', () => {
  test('render as expected when directions is passed as props', () => {
    const component = renderer.create(
      <AddItems placeholder="" name="" directions />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when ingredients is pass as props', () => {
    const component = renderer.create(
      <AddItems placeholder="" name="" ingredients />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
