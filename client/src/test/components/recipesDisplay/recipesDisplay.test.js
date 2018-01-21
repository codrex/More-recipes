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
  test('expected to match snapshot ', () => {
    const wrapper = mount(<PureRecipesDisplay {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test('should render NotFound component when recipes equal []', () => {
    const wrapper = mount(
      <PureRecipesDisplay {...{ ...props, recipes: [], loading: false }} />);
    const tree = toJson(wrapper);
    const notFound = wrapper.find('NotFound').length;

    expect(notFound).toBe(1);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test('should render a Loader component when props.loading is true ',
    () => {
      const wrapper = mount(
        <PureRecipesDisplay {...{ ...props, loading: true }} />);
      const tree = toJson(wrapper);
      const loader = wrapper.find('div.loader').length;
      expect(loader).toBe(1);
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });

  test('should call prop.toggleFav function when favourite icon is clicked',
    () => {
      const wrapper = mount(
        <PureRecipesDisplay {...{ ...props, pageCount: 2 }} />);
      const tree = toJson(wrapper);
      wrapper.find('Icon').find('.fa-heart').simulate('click');
      expect(props.toggleFav).toBeCalled();
      expect(tree).toMatchSnapshot();
    });

  test('should call resetSuccess function when component un-mounts',
    () => {
      const wrapper = mount(
        <PureRecipesDisplay {...props} />);
      const tree = toJson(wrapper);
      wrapper.unmount();
      expect(props.resetSuccess).toBeCalled();
      expect(tree).toMatchSnapshot();
    });

  test('should call setState when component receive recipes as props',
    () => {
      const wrapper = shallow(
        <PureRecipesDisplay {...props} />);
      const tree = toJson(wrapper);
      wrapper.setProps({ recipes: [{}] });
      expect(wrapper.state().recipes).toMatchObject([{}]);
      expect(tree).toMatchSnapshot();
    });
});
