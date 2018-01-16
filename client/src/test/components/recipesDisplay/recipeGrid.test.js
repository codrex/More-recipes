/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import RecipeGrid from '../../../components/pages/RecipesDisplay/RecipeGrid';

const recipe = {
  name: 'coco rice',
  category: 'breakfast',
  views: 22,
  upVotes: 22,
  downVotes: 0,
  id: 1
};

describe('Recipes grid component ', () => {
  test(`expected to render RecipeGrid component with 0 RecipeCard component
  when recipes.length is 0`, () => {
      const component = mount(
        <RecipeGrid
          recipes={[]}
          toggleFav={jest.fn()}
          isUserFav={jest.fn()}
          history={{ push: jest.fn() }}
        />
      );
      const tree = toJson(component);
      const recipeCard = component.find('RecipeCard');
      expect(recipeCard.length).toBe(0);
      expect(tree).toMatchSnapshot();
    });

  test(`expected to render RecipeGrid component with 1 RecipeCard component
  when recipes.length is 1`, () => {
      const component = mount(
        <RecipeGrid
          recipes={[recipe]}
          toggleFav={jest.fn()}
          isUserFav={jest.fn()}
          history={{ push: jest.fn() }}
        />
      );
      const tree = toJson(component);
      const recipeCard = component.find('RecipeCard');
      expect(recipeCard.length).toBe(1);
      expect(tree).toMatchSnapshot();
    });
});
