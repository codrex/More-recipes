import React from 'react';
import renderer from 'react-test-renderer';
import Directions from '../ingredients/ingredients';

const props = {
  ingredients: ['ingredients 1', 'ingredients 2', 'ingredients 3'],
};

describe('Ingredients display component ', () => {
  test('expected to match empty snapshot', () => {
    const component = renderer.create(<Directions {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
