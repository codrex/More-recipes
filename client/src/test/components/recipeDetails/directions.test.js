/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import Directions from '../../../components/pages/RecipeDetails/Directions';

const props = {
  directions: ['directions 1', 'direction 2', 'direction 3'],
};


describe('Directions display component ', () => {
  test('expected to render a list of direction', () => {
    const component = mount(<Directions {...props} />);
    const tree = toJson(component);
    expect(component.find('Accordion').length).toBe(3);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });

  test('should open recipe accordion when show button is clicked',
    () => {
      const component = mount(<Directions directions={['directions 1']} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
      component.find('a#toggle').simulate('click');
      expect(component.find('Direction').instance().state.open).toBe(true);
      expect(tree).toMatchSnapshot();
      expect(tree).toBeInstanceOf(Object);
    });
});
