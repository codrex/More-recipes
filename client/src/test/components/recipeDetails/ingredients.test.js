/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import Ingredients from '../../../components/pages/RecipeDetails/Ingredients';

const props = {
  ingredients: ['ingredients 1', 'ingredients 2', 'ingredients 3'],
};

describe('Ingredients display component ', () => {
  test('should render a list of recipe ingredient', () => {
    const component = mount(<Ingredients {...props} />);
    const tree = toJson(component);
    expect(component.find('ListItem').length).toBe(3);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
