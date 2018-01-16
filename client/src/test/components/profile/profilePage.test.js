/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configStore from '../../../store/configStore';

import Profile, { PureProfile } from '../../../components/pages/Profile';

const props = {
  actions: {
    getProfile: jest.fn(),
    update: jest.fn(),
    currentRecipe: jest.fn(),
    deleteRecipe: jest.fn(),
    removeFromFav: jest.fn(),
    resetSuccess: jest.fn(),
    getCreatedRecipes: jest.fn(),
    resetPageCount: jest.fn(),
    resetRecipes: jest.fn()

  },
  recipes: [{
    name: 'recipe',
    category: '',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    id: 1,
  }],
  history: { push: jest.fn() },
  loading: false,
  success: false,
  user: {
    fullname: 'test user',
    username: 'username',
    email: 'username@gmail.com',
  },
};

describe('Profile Page component ', () => {
  describe('Render page', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<PureProfile {...props} />);
      wrapper.setState({ noLoader: true });
    });

    test(`should render Profile page with RecipeList component when
     props.recipes.length is greater than 0 `,
      () => {
        const tree = toJson(wrapper);
        const recipeList = wrapper.find('RecipeList');
        expect(recipeList.length).toBe(1);
        expect(tree).toMatchSnapshot();
        expect(tree).toBeInstanceOf(Object);
      });
    test(`should render Profile page with NotFound component and
     not render RecipeList when props.recipes.length equal  0 `,
      () => {
        wrapper.setProps({ recipes: [] });
        const tree = toJson(wrapper);
        const recipeList = wrapper.find('RecipeList');
        const notFound = wrapper.find('NotFound');
        wrapper.find('Button.btn-secondary-outline.btn-lg').simulate('click');
        expect(recipeList.length).toBe(0);
        expect(notFound.length).toBe(1);
        expect(tree).toMatchSnapshot();
        expect(tree).toBeInstanceOf(Object);
      });
  });
  describe('Profile update', () => {
    let wrapper;

    beforeEach(() => {
      const store = configStore();
      wrapper = mount(
        <Provider store={store}>
          <Profile {...props} />
        </Provider>
      );
      wrapper.find('Profile').instance().setState({ noLoader: true });
    });
    test('should display a modal with a form when edit button is clicked ',
      () => {
        const tree = toJson(wrapper);
        const profilePage = wrapper.find('Profile');
        const editButton = profilePage
          .find('HeroArea')
          .find('UserInfo')
          .find('Button#editProfile');
        editButton.simulate('click');
        expect(profilePage.instance().state.isModalOpen).toBe(true);
        expect(profilePage.instance().state.modalTitle).toBe('Update profile');
        expect(tree).toMatchSnapshot();
      });

    test('should update user profile when update button is clicked ',
      () => {
        const profilePage = wrapper.find('Profile');
        profilePage.instance().setState({ modalTitle: 'Update profile' });
        const editButton = profilePage
          .find('HeroArea')
          .find('UserInfo')
          .find('Button#editProfile');
        editButton.simulate('click');
        const updateButton = wrapper.find('Modal').find('button#submit');
        updateButton.simulate('click');
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
      });
  });
  describe('Manage recipe', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<PureProfile {...props} />);
      wrapper.setState({ noLoader: true });
    });
    test('should render a model when delete recipe icon is clicked', () => {
      const recipeList = wrapper.find('RecipeList');
      const tree = toJson(wrapper);
      recipeList.find('.fa.fa-trash-o.delete-icon').simulate('click');
      wrapper.setProps({ loading: true });
      wrapper.setProps({ success: true, loading: false });
      expect(wrapper.state().modalTitle).toBe('Delete recipe');
      expect(wrapper.state().isModalOpen).toBe(true);
      expect(tree).toMatchSnapshot();
    });
    test('should call history.push when edit icon is clicked',
      () => {
        const recipeList = wrapper.find('RecipeList');
        const tree = toJson(wrapper);
        recipeList.find('.fa.fa-pencil.edit-icon').simulate('click');
        expect(props.history.push).toBeCalled();
        expect(tree).toMatchSnapshot();
      });
    test('should call history.push when recipeList item is clicked',
      () => {
        const recipeList = wrapper.find('RecipeList');
        const tree = toJson(wrapper);
        recipeList.find('ListItem.recipe-list-item').simulate('click');
        expect(props.history.push).toBeCalled();
        expect(tree).toMatchSnapshot();
      });
  });
});

