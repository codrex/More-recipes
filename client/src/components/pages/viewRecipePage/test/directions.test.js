import React from 'react';
import renderer from 'react-test-renderer';
import Directions from '../directions/directions';

const props = {
  directions: ['directions 1', 'direction 2', 'direction 3'],
};

describe('Directions display component ', () => {
  test('expected to match empty snapshot', () => {
    const component = renderer.create(<Directions {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
