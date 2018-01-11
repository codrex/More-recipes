import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
  test('expected to match snapshot when there is no recipe', () => {
    const component = mount(
      <BrowserRouter>
        <RecipeGrid
          recipes={[]}
          toggleFav={jest.fn()}
          isUserFav={jest.fn()}
          history={{ push: jest.fn() }}
        />
      </BrowserRouter>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when there is one recipe', () => {
    const component = mount(
      <BrowserRouter>
        <RecipeGrid
          recipes={[recipe]}
          toggleFav={jest.fn()}
          isUserFav={jest.fn()}
          history={{ push: jest.fn() }}
        />
      </BrowserRouter>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
