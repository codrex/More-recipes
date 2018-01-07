import React from 'react';
import toJson from 'enzyme-to-json';
import { PureLoginForm } from '../../../components/pages/Landing/LoginForm';

const props = {
  login: jest.fn(),
  handleSubmit: jest.fn(),
  submitting: false
};

describe('login form component ', () => {
  test('render as expected when submitting props is false', () => {
    const component = shallow(<PureLoginForm {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('render as expected when submitting props is true', () => {
    const component = shallow(
      <PureLoginForm {...{ ...props, submitting: true }} />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
