import React from 'react';
import toJson from 'enzyme-to-json';
import CallToAction from '../../../components/pages/Landing/CallToAction';

const props = {
  push: jest.fn(),
  signin: jest.fn(),
  signup: jest.fn(),
};

describe('Cta form component ', () => {
  test('expect to match snapshot when signin button is clicked', () => {
    const component = mount(<CallToAction {...props} />);
    const tree = toJson(component);
    component.find('Button#login').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('expect to match snapshot when signup button is clicked', () => {
    const component = mount(<CallToAction {...props} />);
    const tree = toJson(component);
    component.find('Button#signup').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
