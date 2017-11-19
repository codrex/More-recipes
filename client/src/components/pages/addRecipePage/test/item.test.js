import React from 'react';
import Item from '../addItems/item';
import renderer from 'react-test-renderer';


describe('Item component ', () => {
  test('render as expected', () => {
    const component = renderer.create(<Item name="directions" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
