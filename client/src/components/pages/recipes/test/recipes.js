import React from 'react';
import { Dashboard } from '../recipes';
import store from 'redux-mock-store';
import toJson from 'enzyme-to-json';

const props = {
  actions: {
    getTopRecipes: jest.fn(),
    toggleFav: jest.fn(),
    getProfile: jest.fn(),
    logout: jest.fn(),
  },
  recipes: [{
    recipeName: 'Ogbemudia Rex',
    category: '',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    recipeId: 1,
  }],
  user: {
    favRecipes: [{
      recipeName: 'Ogbemudia Rex',
      category: '',
      views: 1,
      upVotes: 1,
      downVotes: 1,
      recipeId: 1,
    }],
    createdRecipes: [{
      recipeName: 'Ogbemudia Rex',
      category: '',
      views: 1,
      upVotes: 1,
      downVotes: 1,
      recipeId: 1,
    }],
  },
  loading: false,
  match: { history: { push: jest.fn() } },
  store: { store: store() },
};

describe('Dashboard component ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(< Dashboard {...props} />);
  });
  test('render as expected ', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('should match empty snapshot when loading is true', () => {
    const wrapper3 = mount(< Dashboard {...{ ...props, loading: true }} />);
    const tree = toJson(wrapper3);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('should match empty snapshot when recipes is undefined', () => {
    const wrapper3 = mount(< Dashboard {...{ ...props, loading: true, recipes: undefined }} />);
    const tree = toJson(wrapper3);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('render as expected when Top Recipes nav link is clicked ', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#getTopRecipes').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when favorite Recipes nav link is clicked ', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#getFavRecipes').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when logout link is clicked ', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#logout').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(props.actions.logout).toBeCalled();
  });

});

