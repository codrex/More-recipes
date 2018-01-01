import React from 'react';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { PureRecipeDetails } from '../../components/pages/recipeDetails/recipeDetails';
import configureStore from '../../store/configStore';

const store = configureStore();
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
    recipeName: 'test tester',
    category: '',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    recipeId: 1,
    ingredients: [],
    directions: [],
    Owner: {
      id: 1,
      username: 'test',
      fullname: 'test test ',
      profilePix: 'UNKNOWN',
      email: 'test.test@gmail.com',
    },
    RecipeReviews: [{
      id: 50,
      review: 'resioioioioi',
      ReviewerId: 1,
      RecipeId: 1,
      Reviewer: {
        id: 1,
        username: 'testi',
        fullname: 'test tester ',
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

describe('View Recipes Page component ', () => {
  test('to match empty snapshot ', () => {
    const wrapper = shallow(<PureRecipeDetails {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('should show a loader when loading is true ', () => {
    const wrapper = shallow(<PureRecipeDetails {...{ ...props, ...{ loading: true } }} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('render as expected when favorite icon is clicked ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PureRecipeDetails {...props} />
      </Provider>
    );
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#toggleFav').simulate('click');
    expect(props.actions.toggleFav).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when upvote icon is clicked ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PureRecipeDetails {...props} />
      </Provider>
    );
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#upvote').simulate('click');
    expect(props.actions.vote).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when downvote icon is clicked ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PureRecipeDetails {...props} />
      </Provider>
    );
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    wrapper.find('#downvote').simulate('click');
    expect(props.actions.vote).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
});

