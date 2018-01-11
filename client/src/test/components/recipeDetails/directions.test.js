import React from 'react';
import toJson from 'enzyme-to-json';
import Directions from '../../../components/pages/RecipeDetails/Directions';

const props = {
  directions: ['directions 1', 'direction 2', 'direction 3'],
};

describe('Directions display component ', () => {
  test('expected to match snapshot', () => {
    const component = shallow(<Directions {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
