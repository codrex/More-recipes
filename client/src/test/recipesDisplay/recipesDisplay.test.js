import React from 'react';
import store from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { PureRecipesDisplay } from '../../components/pages/recipesDisplay/recipesDisplay';

const props = {
  toggleFav: jest.fn(),
  resetPageCount: jest.fn(),
  getRecipes: jest.fn(),
  recipes: [{
    name: 'capachino',
    category: 'drinks',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    id: 1,
    image: {},
  }],
  user: {
    id: 1,
    favRecipes: [{
      id: 1,
    }],
  },
  loading: false,
  history: { push: jest.fn() },
  store: { store: store() },
};

describe('RecipesDisplay page component ', () => {
  test('render as expected ', () => {
    const wrapper = mount(<PureRecipesDisplay {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('should match empty snapshot when loading is true', () => {
    const wrapper = mount(
      <PureRecipesDisplay {...{ ...props, loading: true }} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('should match empty snapshot when recipes has a length of 0', () => {
    const wrapper = mount(<PureRecipesDisplay {...{ ...props, loading: true, recipes: [] }} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
