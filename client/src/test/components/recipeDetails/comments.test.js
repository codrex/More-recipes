import React from 'react';
import toJson from 'enzyme-to-json';
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
  test('expected to match snapshot', () => {
    const component = mount(<Comments {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
