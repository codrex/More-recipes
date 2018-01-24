/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureRecipes } from '../../../components/pages/Recipes';

const props = {
  getAllRecipes: jest.fn(),
  search: jest.fn(),
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
};

describe('Recipes page component ', () => {
  test('expected to render recipes page  ', () => {
    const wrapper = shallow(<PureRecipes {...props} />);
    const tree = toJson(wrapper);
    wrapper.setProps({ searchTerm: 'beans' });
    wrapper.setProps({ searchTerm: 'beans' });
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test('should trigger get all recipes request when fetchRecipes is called',
    () => {
      const wrapper = shallow(<PureRecipes {...{ ...props }} />);
      const tree = toJson(wrapper);
      wrapper.instance().fetchRecipes(1);
      expect(props.getAllRecipes).toBeCalled();
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });

  test(`should search for recipes when search term is defined and fetchRecipes
  is called`, () => {
      const wrapper = shallow(
        <PureRecipes {...{ ...props, searchTerm: 'rice' }} />
      );
      const tree = toJson(wrapper);
      wrapper.instance().fetchRecipes(1);
      expect(props.search).toHaveBeenCalledWith('rice', 1);
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });
});
