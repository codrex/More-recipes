/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureCommentForm }
  from '../../../components/pages/RecipeDetails/CommentForm';

const props = {
  postReview: jest.fn(),
  handleSubmit: jest.fn(),
  submitting: false,
  id: 1,
  initialize: jest.fn(),
  success: false,
  resetSuccess: jest.fn()
};

describe('CommentForm component ', () => {
  test('expected to match snapshot', () => {
    const component = shallow(<PureCommentForm {...props} />);
    component.setProps({ success: true });
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
