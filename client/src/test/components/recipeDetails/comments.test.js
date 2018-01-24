/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import Comments from '../../../components/pages/RecipeDetails/Comments';

const props = {
  loading: false,
  comments: [{
    id: 1,
    review: 'cool recipe',
    ReviewerId: 1,
    RecipeId: 1,
    createdAt: '',
    reviewer: {
      id: 1,
      username: 'testuser',
      fullname: 'test user ',
      profilePix: 'UNKNOWN',
      email: 'test.test@gmail.com',
    }
  }],
};

describe('Comments display component ', () => {
  test('expected to render a list of comment', () => {
    const component = mount(<Comments {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(component.find('Comment').length).toBe(1);
    expect(tree).toBeInstanceOf(Object);
  });
});
