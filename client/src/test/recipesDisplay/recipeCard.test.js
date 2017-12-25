import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import RecipeCard from '../../components/pages/recipesDisplay/recipeCard';


const props = {
  recipeName: 'rice and beans',
  category: 'dinner',
  views: 120,
  upVotes: 30,
  downVotes: 0,
  recipeId: 1,
  toggleFav: jest.fn(),
  isFav: jest.fn(),
  push: jest.fn()
};

describe('Recipes card component ', () => {
  test('render as expected', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecipeCard {...props} />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when favorite icon is clicked ', () => {
    const wrapper = mount(
      <BrowserRouter>
        <RecipeCard {...props} />
      </BrowserRouter>
    );
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('.fav').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(props.toggleFav).toBeCalled();
  });
});
