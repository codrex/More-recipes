import React from 'react';
import RecipesGrid from '../recipesGrid';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

const recipe = {
  recipeName: 'coco rice',
  category: 'breakfast',
  views: 22,
  upVotes: 22,
  downVotes: 0,
  id: 1
};

describe('Recipes grid component ', () => {
  test('render as expected without any recipe', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipesGrid recipes={[]} />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('render as expected with one recipe', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipesGrid recipes={[recipe]} />
      </BrowserRouter>
    );
    // const componentTwo = renderer.create(<RecipesGrid recipes={[]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
