import React from 'react';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';
import { PureLoginForm } from '../loginForm/loginForm';

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
    const component = (
      <Provider store={configureStore()}>
        <BrowserRouter>
          <PureLoginForm {...{ ...props, submitting: true }} />
        </BrowserRouter>
      </Provider>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
