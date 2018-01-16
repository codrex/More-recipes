/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import RecipeCard from '../../../components/pages/RecipesDisplay/RecipeCard';

const props = {
  recipeName: 'rice and beans',
  category: 'dinner',
  views: 120,
  upVotes: 30,
  downVotes: 0,
  recipeId: 1,
  toggleFav: jest.fn(),
  isFav: jest.fn(),
  push: jest.fn(),
};

describe('Recipes card component ', () => {
  let component;
  beforeEach(() => {
    component = mount(<RecipeCard {...props} />);
  });

  test('expected to match snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  test('expected to match snapshot when favorite icon is clicked ', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    component.find('.fav').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(props.toggleFav).toBeCalled();
  });

  test('expected to match snapshot when view recipe button is clicked ',
    () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
      component.find('Button.recipe-card-underlay-btn').simulate('click');
      expect(tree).toMatchSnapshot();
      expect(props.toggleFav).toBeCalled();
    });
});
