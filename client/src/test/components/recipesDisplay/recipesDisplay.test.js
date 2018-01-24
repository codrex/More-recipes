/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import store from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { PureRecipesDisplay } from '../../../components/pages/RecipesDisplay';

const props = {
  toggleFav: jest.fn(),
  resetPageCount: jest.fn(),
  getRecipes: jest.fn(),
  resetSuccess: jest.fn(),
  recipes: [{
    name: 'cappuccino',
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

describe('Recipes Display page component ', () => {
  test('expected to render recipes display page ', () => {
    const wrapper = mount(<PureRecipesDisplay {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(wrapper.find('RecipesDisplay').length).toBe(1);
    expect(wrapper.find('HeroArea').length).toBe(1);
    expect(wrapper.find('RecipeGrid').length).toBe(1);
    expect(wrapper.find('RecipeCard').length).toBe(1);
    expect(tree).toBeInstanceOf(Object);
  });

  test('should render NotFound component when there is not recipe on the list',
    () => {
      const wrapper = mount(
        <PureRecipesDisplay {...{ ...props, recipes: [], loading: false }} />);
      const tree = toJson(wrapper);
      const notFound = wrapper.find('NotFound').length;
      expect(notFound).toBe(1);
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });

  test('should render a Loader component when there is an active ajax request',
    () => {
      const wrapper = mount(
        <PureRecipesDisplay {...{ ...props, loading: true }} />);
      const tree = toJson(wrapper);
      const loader = wrapper.find('div.loader').length;
      expect(loader).toBe(1);
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });

  test('should remove recipe from favourites when favourite icon is clicked',
    () => {
      const wrapper = mount(
        <PureRecipesDisplay {...{ ...props, pageCount: 2 }} />);
      const tree = toJson(wrapper);
      wrapper.find('Icon').find('.fa-heart').simulate('click');
      expect(props.toggleFav)
        .toHaveBeenCalledWith(1, 'Recipe removed from favourites');
      expect(tree).toMatchSnapshot();
    });

  test('should call reset success action creator when component un-mounts',
    () => {
      const wrapper = mount(
        <PureRecipesDisplay {...props} />);
      const tree = toJson(wrapper);
      wrapper.unmount();
      expect(props.resetSuccess).toBeCalled();
      expect(tree).toMatchSnapshot();
    });

  test('should set state when component receive recipes as props',
    () => {
      const wrapper = shallow(
        <PureRecipesDisplay {...props} />);
      const tree = toJson(wrapper);
      wrapper.setProps({ recipes: [{}] });
      expect(wrapper.state().recipes).toMatchObject([{}]);
      expect(tree).toMatchSnapshot();
    });
});
