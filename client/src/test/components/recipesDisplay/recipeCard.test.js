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

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('expect to render recipe card component', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(component.find('RecipeCard').length).toBe(1);
  });

  test('expected to favorite recipe when favorite icon is clicked ', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    component.find('.fav').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(props.toggleFav).toHaveBeenCalledWith(1);
  });

  test(`expected to navigate to recipe details page when view recipe button
  is clicked `,
    () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
      component.find('Button.recipe-card-underlay-btn').simulate('click');
      expect(tree).toMatchSnapshot();
      expect(props.push).toHaveBeenCalledWith('/recipe/1');
    });
});
