import React from 'react';
import CategoryFilter from '../categoryFilter';
import renderer from 'react-test-renderer';

describe('CategoryFilter component ', () => {
  test('render as expected', () => {
    const component = renderer.create(< CategoryFilter />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
