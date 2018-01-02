import React from 'react';
import toJson from 'enzyme-to-json';
import RecipeList from '../../components/pages/profile/recipeList';

const props = {
  recipes: [{
    name: 'recipe',
    category: '',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    id: 1
  }],
  onEditIconCliked: jest.fn(),
  handleClick: jest.fn(),
  onDeleteIconClicked: jest.fn(),
  onFavIconClicked: jest.fn(),
  type: 'createdRecipes',
  index: '1'
};

describe('Recipes list component ', () => {
  test('to match empty snapshot ', () => {
    const wrapper = shallow(<RecipeList {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('render as expected when delete and edit icon are clicked ', () => {
    const wrapper = mount(<RecipeList {...props} />);
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
