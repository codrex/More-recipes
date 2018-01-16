/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import CallToAction from '../../../components/pages/Landing/CallToAction';

const props = {
  push: jest.fn(),
  signin: jest.fn(),
  signup: jest.fn(),
};

describe('Cta form component ', () => {
  let component;
  beforeEach(() => {
    component = mount(<CallToAction {...props} />);
  });

  test('expect to match snapshot when signin button is clicked', () => {
    const tree = toJson(component);
    component.find('Button#login').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(props.signin).toBeCalled();
    expect(tree).toBeInstanceOf(Object);
  });

  test('expect to match snapshot when signup button is clicked', () => {
    const tree = toJson(component);
    component.find('Button#signup').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(props.signup).toBeCalled();
    expect(tree).toBeInstanceOf(Object);
  });
});
