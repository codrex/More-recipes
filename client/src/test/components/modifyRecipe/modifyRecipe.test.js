/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureModifyRecipe } from '../../../components/pages/ModifyRecipe';
import { RECIPE_MODIFIED } from '../../../constants';

const props = {
  match: {
    params: {
      id: 1
    }
  },
  message: 'recipe modified',
  getRecipe: jest.fn(),
  modifyRecipe: jest.fn(),
  resetSuccessMessage: jest.fn(),
  loading: false,
  statusCode: 200,
  recipe: {
    name: 'cappuccino',
    category: 'drinks',
    views: 1,
    upVotes: 1,
    downVotes: 1,
    id: 1,
    image: {},
  },
  user: {
    id: 1,
    favRecipes: [{
      id: 1,
    }],
  },
  history: { push: jest.fn() },
};

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('Modify recipe page component ', () => {
  test('should render modify recipe page', () => {
    const wrapper = shallow(<PureModifyRecipe {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(wrapper.find('RecipeEditor').length).toBe(1);
    expect(tree.props.hasNotFound).toBe(false);
    expect(tree).toBeInstanceOf(Object);
  });

  test('should redirect to recipe details page when recipe is modified ',
    () => {
      const wrapper = shallow(<PureModifyRecipe {...props} />);
      const tree = toJson(wrapper);
      wrapper.setProps({ message: RECIPE_MODIFIED });
      expect(props.resetSuccessMessage).toBeCalled();
      expect(props.history.push).toHaveBeenCalledWith('/recipe/1');
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });

  test('expected to render a NotFound page when recipe is not found ',
    () => {
      const wrapper = shallow(<PureModifyRecipe {...props} />);
      wrapper.setProps({ statusCode: 404 });
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(tree.props.hasNotFound).toBe(true);
      expect(tree).toBeInstanceOf(Object);
    });

  test(`should send a modify recipe request when modify recipe button
  is clicked`, () => {
      const wrapper = shallow(<PureModifyRecipe {...props} />);
      const tree = toJson(wrapper);
      wrapper.instance().modifyButtonClicked();
      expect(props.modifyRecipe)
        .toHaveBeenCalledWith(props.recipe, RECIPE_MODIFIED);
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });
});
