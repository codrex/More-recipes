import React from 'react';
import renderer from 'react-test-renderer';
import Comments from '../../../components/pages/RecipeDetails/Comments';

const props = {
  comments: [{
    id: 50,
    review: 'cool recipe',
    ReviewerId: 1,
    RecipeId: 1,
    createdAt: '',
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
