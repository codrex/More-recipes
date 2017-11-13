import React from 'react';
import { Provider } from 'react-redux';
import SmartProfilePage, { ProfilePage } from '../index';
import configureStore from '../../../../store/configStore';
import toJson from 'enzyme-to-json';

const store = configureStore();
const props = {
  actions: {
    getProfile: jest.fn(),
    update: jest.fn(),
    currentRecipe: jest.fn(),
    deleteRecipe: jest.fn(),
    removeFromFav: jest.fn(),
    resetSuccess: jest.fn(),

  },
  match: { history: { push: jest.fn() } },
  loading: false,
  success: false,
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
};

describe('Profile Page component ', () => {
  test('to match empty snapshot ', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('render as expected when created recipes nav link is clicked ', () => {
    const wrapper = mount(< ProfilePage {...{ ...props }} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#createdRecipes').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when favorite recipes nav link is clicked ', () => {
    const wrapper = mount(< ProfilePage {...{ ...props }} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#favRecipes').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when edit profile button is clicked ', () => {
    const wrapper = mount(
      <Provider store={store}>
        < SmartProfilePage {...{ ...props, loading: true }} />
      </Provider>
    );
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('UserInfo').find('#editProfile').simulate('click');
    expect(tree).toMatchSnapshot();
  });
});

