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
    id: 1,
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
  favRecipes: [{
    recipeName: 'test tester',
    category: '',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    recipeId: 1,
  }],

  votes: [],
  requestCount: 0
};
jest.mock('../../../components/pages/RecipeDetails/CommentForm');

describe('View Recipes Page component ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PureRecipeDetails {...props} />);
  });

  test('expected match snapshot ', () => {
    const tree = toJson(wrapper);
    wrapper.setState({ allowLoading: true });
    wrapper.setProps({ statusCode: 200 });
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test('expected to match snapshot when favorite icon is clicked ', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#toggleFav').simulate('click');
    expect(props.actions.toggleFav).toBeCalled();
    expect(tree).toMatchSnapshot();
  });

  test('expected to match snapshot when upvote icon is clicked ', () => {
    const tree = toJson(wrapper);
    const votes = [{ upVote: true, downVote: false, recipeId: 1 }];
    wrapper.instance().recipeId = props.recipe.id;
    expect(tree).toMatchSnapshot();
    wrapper.find('#upvote').simulate('click');
    expect(props.actions.vote).toBeCalled();
    wrapper.setProps({ votes });
    expect(wrapper.state().upVote).toBe(true);
    expect(wrapper.state().downVote).toBe(false);
    expect(tree).toMatchSnapshot();
  });

  test('expected to match snapshot when downvote icon is clicked ', () => {
    const tree = toJson(wrapper);
    const votes = [{ upVote: false, downVote: true, recipeId: 1 }];
    wrapper.instance().recipeId = props.recipe.id;
    expect(tree).toMatchSnapshot();
    wrapper.find('#downvote').simulate('click');
    expect(props.actions.vote).toBeCalled();
    wrapper.setProps({ votes });
    expect(wrapper.state().upVote).toBe(false);
    expect(wrapper.state().downVote).toBe(true);
    expect(tree).toMatchSnapshot();
  });

  test('expected to match snapshot when edit icon is clicked ', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#edit').simulate('click');
    expect(props.history.push).toBeCalled();
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

