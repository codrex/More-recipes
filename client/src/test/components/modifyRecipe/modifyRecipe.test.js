import React from 'react';
import toJson from 'enzyme-to-json';
import { PureModifyRecipe } from '../../../components/pages/ModifyRecipe';

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
    name: 'capachino',
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
  test('render as expected ', () => {
    const wrapper = shallow(<PureModifyRecipe {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree.props.hasNotFound).toBe(false);
    expect(tree).toBeInstanceOf(Object);
  });
  test('render as expected when recipe was not found ', () => {
    const wrapper = shallow(<PureModifyRecipe {...props} />);
    wrapper.setProps({ statusCode: 404 });
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree.props.hasNotFound).toBe(true);
    expect(tree).toBeInstanceOf(Object);
  });
  test('render as expected when recipe id is not a number', () => {
    const wrapper = shallow(<PureModifyRecipe {...{
      ...props,
      match: {
        params: {
          id: 'fkfmf'
        }
      }, }}
    />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
    expect(tree.props.hasNotFound).toBe(true);
    expect(tree).toBeInstanceOf(Object);
  });
});
