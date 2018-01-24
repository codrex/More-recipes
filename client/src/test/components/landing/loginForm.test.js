/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureLoginForm } from '../../../components/pages/Landing/LoginForm';

const props = {
  login: jest.fn(),
  handleSubmit: jest.fn(),
  submitting: false
};

describe('login form component ', () => {
  test('should render a login form', () => {
    const component = shallow(<PureLoginForm {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(component.find('Form').length).toBe(1);
    expect(component.find('#username').length).toBe(1);
    expect(component.find('#password').length).toBe(1);
    expect(tree).toBeInstanceOf(Object);
  });
});
