import React from 'react';
import Recipes from '../recipesList/recipesList';
import toJson from 'enzyme-to-json';

const props = {
  recipes: [],
  onEditIconCliked: jest.fn(),
  handleClick: jest.fn(),
  onDeleteIconClicked: jest.fn(),
  onFavIconClicked: jest.fn(),
  type: 'createdRecipes'
};

describe('Recipes list component ', () => {
  test('to match empty snapshot ', () => {
    const wrapper = shallow(<Recipes {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('render as expected when created recipes nav link is clicked ', () => {
    const wrapper = mount(< Recipes {...{ ...props, recipes: [{}] }} />);
    let tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('ListItem').simulate('click');
    tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when type equals favRecipes ', () => {
    const wrapper = mount(< Recipes {...{ ...props, recipes: [{}], type: 'favRecipes' }} />);
    let tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('ListItem').simulate('click');
    tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when delete and edit icon are clicked ', () => {
    const wrapper = mount(< Recipes {...{ ...props, recipes: [{}] }} />);
    let tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('ListItem').find('Icon').at(0)
    .simulate('click');
    wrapper.find('ListItem').find('Icon').at(1)
    .simulate('click');
    tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});

