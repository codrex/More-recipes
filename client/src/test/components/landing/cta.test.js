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

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should navigate to "/login" when login button is clicked', () => {
    const tree = toJson(component);
    component.find('Button#login').simulate('click');
    expect(tree).toMatchSnapshot();
    expect(props.signin).toBeCalled();
    expect(props.push).toHaveBeenCalledWith('/login');
    expect(tree).toBeInstanceOf(Object);
  });

  test(`should navigate to "/create-account" when create account button is
  clicked`, () => {
      const tree = toJson(component);
      component.find('Button#signup').simulate('click');
      expect(tree).toMatchSnapshot();
      expect(props.signup).toBeCalled();
      expect(props.push).toHaveBeenCalledWith('/create-account');
      expect(tree).toBeInstanceOf(Object);
    });
});
