import React from 'react';
import renderer from 'react-test-renderer';
import Ingredients from '../../../components/pages/RecipeDetails/Ingredients';

const props = {
  ingredients: ['ingredients 1', 'ingredients 2', 'ingredients 3'],
};

describe('Ingredients display component ', () => {
  test('expected to match snapshot', () => {
    const component = renderer.create(<Ingredients {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
