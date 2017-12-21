import React from 'react';
import renderer from 'react-test-renderer';
import Comments from '../comments/comments';

const props = {
  comments: [{
    id: 50,
    review: 'resioioioioi',
    ReviewerId: 1,
    RecipeId: 1,
    reviewer: {
      id: 1,
      username: 'testi',
      fullname: 'test tester ',
      profilePix: 'UNKNOWN',
      email: 'test.test@gmail.com',
    }
  }],
};

describe('Comments display component ', () => {
  test('expected to match empty snapshot', () => {
    const component = renderer.create(<Comments {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
