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

describe('Modify recipe page component ', () => {
  test('expected to match snapshot ', () => {
    const wrapper = shallow(<PureModifyRecipe {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree.props.hasNotFound).toBe(false);
    expect(tree).toBeInstanceOf(Object);
  });

  test('expected to match snapshot when message is equal RECIPE_MODIFIED',
    () => {
      const wrapper = shallow(<PureModifyRecipe {...props} />);
      const tree = toJson(wrapper);
      wrapper.setProps({ message: RECIPE_MODIFIED });
      expect(props.resetSuccessMessage).toBeCalled();
      expect(props.history.push).toBeCalled();
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });

  test('expected to render a NotFound component when recipe was not found ',
    () => {
      const wrapper = shallow(<PureModifyRecipe {...props} />);
      wrapper.setProps({ statusCode: 404 });
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      expect(tree.props.hasNotFound).toBe(true);
      expect(tree).toBeInstanceOf(Object);
    });

  test('should call modifyRecipe method when modify recipe button is clicked',
    () => {
      const wrapper = shallow(<PureModifyRecipe {...props} />);
      const tree = toJson(wrapper);
      wrapper.instance().modifyButtonClicked();
      expect(props.modifyRecipe).toBeCalled();
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });
});
