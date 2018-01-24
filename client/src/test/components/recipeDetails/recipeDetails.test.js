/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureRecipeDetails } from '../../../components/pages/RecipeDetails';

const props = {
  userId: 1,
  actions: {
    redirect: jest.fn(),
    getRecipe: jest.fn(),
    vote: jest.fn(),
    toggleFav: jest.fn(),
    getUser: jest.fn(),
    getReviews: jest.fn(),
    getVotes: jest.fn(),
    resetRecipe: jest.fn(),
    resetPageCount: jest.fn()
  },
  recipe: {
    name: 'cappuccino',
    category: '',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    id: 2,
    ingredients: [],
    directions: [],
    owner: {
      id: 1,
      username: 'test',
      fullname: 'test test ',
      profilePix: 'UNKNOWN',
      email: 'test.test@gmail.com',
    },
    RecipeReviews: [{
      id: 50,
      review: 'cool recipe',
      ReviewerId: 1,
      RecipeId: 1,
      Reviewer: {
        id: 1,
        username: 'test user',
        fullname: 'test user ',
        profilePix: 'UNKNOWN',
        email: 'test.test@gmail.com',
      }
    }],
  },
  loading: false,
  history: { push: jest.fn() },
  match: {
    params: {
      id: 2
    },
  },
  favRecipes: [{ id: 1 }],
  votes: [],
  requestCount: 0
};
jest.mock('../../../components/pages/RecipeDetails/CommentForm');

describe('View Recipes Page component ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PureRecipeDetails {...props} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('expected to render recipe details page', () => {
    const tree = toJson(wrapper);
    wrapper.setState({ allowLoading: true });
    wrapper.setProps({ statusCode: 200 });
    expect(tree).toMatchSnapshot();
    expect(wrapper.find('RecipeDetails').length).toBe(1);
    expect(wrapper.find('Ingredients').length).toBe(1);
    expect(wrapper.find('Directions').length).toBe(1);
    expect(wrapper.find('HeroArea').length).toBe(1);
    expect(wrapper.find('Comments').length).toBe(1);
    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.find('Icon').length).toBe(4);
    expect(tree).toBeInstanceOf(Object);
  });

  describe('favourite icon is clicked', () => {
    test(`expected to favourite a recipe when recipe is not the on user's
    favourite recipes list`,
      () => {
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
        wrapper.find('#toggleFav').simulate('click');
        expect(props.actions.toggleFav)
          .toHaveBeenCalledWith(2, 'Added to favourites');
        expect(tree).toMatchSnapshot();
      });

    test(`expected to remove recipe from user's favourites when recipe is the
    on user's favourite recipes list`,
      () => {
        const tree = toJson(wrapper);
        wrapper.setProps({ favRecipes: [{ id: 1 }, { id: 2 }] });
        expect(tree).toMatchSnapshot();
        wrapper.find('#toggleFav').simulate('click');
        expect(props.actions.toggleFav)
          .toHaveBeenCalledWith(2, 'Removed from favourites');
        expect(tree).toMatchSnapshot();
      });
  });

  describe('upvote icon is clicked', () => {
    test('expected to upvote a recipe when state.upVote is false ',
      () => {
        const tree = toJson(wrapper);
        const votes = [{ upVote: true, downVote: false, recipeId: 2 }];
        wrapper.instance().recipeId = props.recipe.id;
        expect(tree).toMatchSnapshot();
        wrapper.find('#upvote').simulate('click');
        expect(props.actions.vote)
          .toHaveBeenCalledWith(2, 'up', true, 'Recipe upvoted');
        wrapper.setProps({ votes });
        expect(wrapper.state().upVote).toBe(true);
        expect(wrapper.state().downVote).toBe(false);
        expect(tree).toMatchSnapshot();
      });

    test('expected to cancel upvote when state.upVote is true ',
      () => {
        const tree = toJson(wrapper);
        wrapper.instance().recipeId = props.recipe.id;
        wrapper.setState({ upVote: true });
        expect(tree).toMatchSnapshot();
        wrapper.find('#upvote').simulate('click');
        expect(props.actions.vote)
          .toHaveBeenCalledWith(2, 'up', false, 'Vote cancelled');
        expect(tree).toMatchSnapshot();
      });
  });

  describe('downvote icon clicked', () => {
    test('expected to downvote a recipe when state.downVote is false ',
      () => {
        const tree = toJson(wrapper);
        const votes = [{ upVote: false, downVote: true, recipeId: 2 }];
        wrapper.instance().recipeId = props.recipe.id;
        expect(tree).toMatchSnapshot();
        wrapper.find('#downvote').simulate('click');
        expect(props.actions.vote)
          .toHaveBeenCalledWith(2, 'down', true, 'Recipe downvoted');
        wrapper.setProps({ votes });
        expect(wrapper.state().upVote).toBe(false);
        expect(wrapper.state().downVote).toBe(true);
        expect(tree).toMatchSnapshot();
      });

    test('expected to cancel downvote when state.downVote is true ',
      () => {
        const tree = toJson(wrapper);
        wrapper.instance().recipeId = props.recipe.id;
        wrapper.setState({ downVote: true });
        expect(tree).toMatchSnapshot();
        wrapper.find('#downvote').simulate('click');
        expect(props.actions.vote)
          .toHaveBeenCalledWith(2, 'down', false, 'Vote cancelled');
        expect(tree).toMatchSnapshot();
      });
  });

  test('expected to navigate to modify recipe page when edit icon is clicked ',
    () => {
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      wrapper.find('#edit').simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/modify/2');
      expect(tree).toMatchSnapshot();
    });

  test('should render a NotFound component when statusCode is 404 ', () => {
    wrapper.setProps({ statusCode: 404 });
    const tree = toJson(wrapper);
    const notFound = wrapper.find('NotFound');
    expect(wrapper.state().hasNotFound).toBe(true);
    expect(notFound.length).toBe(1);
    expect(tree).toMatchSnapshot();
  });
});

