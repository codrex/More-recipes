/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureSignupForm } from '../../../components/pages/Landing/SignupForm';

describe('sign up form component ', () => {
  test('should render a signup form', () => {
    const component = shallow(<PureSignupForm />);
    const tree = toJson(component);
    expect(component.find('Form').length).toBe(1);
    expect(component.find('#username').length).toBe(1);
    expect(component.find('#password').length).toBe(1);
    expect(component.find('#email').length).toBe(1);
    expect(component.find('#fullname').length).toBe(1);
    expect(tree).toMatchSnapshot();
  });
});
