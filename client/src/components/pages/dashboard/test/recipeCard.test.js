import React from 'react';
import RecipeCard from '../recipeCard';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';


describe('Recipes card component ', () => {
  test('render as expected', () => {
    const component = renderer.create(
      <BrowserRouter>
        < RecipeCard
          recipeName="rice and beans"
          category="dinner"
          view={120}
          upVotes={30}
          downVotes={0}
        />
      </BrowserRouter>
  );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
