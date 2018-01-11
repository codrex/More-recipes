import React from 'react';
import toJson from 'enzyme-to-json';
import RecipeList from '../../../components/pages/Profile/RecipeList';

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
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<RecipeList {...props} />);
  });
  test('expected to match snapshot ', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('expected to match snapshot when delete and edit icon is clicked ', () => {
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

