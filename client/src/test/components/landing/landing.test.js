/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Landing, { PureLanding } from '../../../components/pages/Landing';
import configureStore from '../../../store/configStore';


const props = {
  actions: {
    loginAction: jest.fn(),
    signupAction: jest.fn()
  },
  success: true,
  history: {
    push: jest.fn(),
  },
  auth: {
    authenticated: false,
    redirectTo: '/recipes'
  },
  loading: false,
  match: { path: '/' }
};

describe('Landing page component ', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('expected to render without a modal when the path is "/" ', () => {
    const component = mount(<PureLanding {...props} />);
    expect(component.state().signin).toBe(false);
    expect(component.state().signup).toBe(false);
    expect(component.state().formTitle).toBe('');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  test('expected to render a modal and a login form when the path is "/login"',
    () => {
      const component = shallow(
        <PureLanding {...{ ...props, match: { path: '/login' } }} />
      );
      const tree = toJson(component);

      expect(component.state().signin).toBe(true);
      expect(component.state().signup).toBe(false);
      expect(component.state().formTitle).toBe('Log in to your account');
      expect(component.find('ReduxForm').length).toBe(1);
      expect(tree).toMatchSnapshot();
    });

  test(`expected to render with a modal and a signup form when path is
  "/create-account" `,
    () => {
      const component = shallow(
        <PureLanding {...props} match={{ path: '/create-account' }} />
      );
      const tree = toJson(component);

      expect(component.state().signin).toBe(false);
      expect(component.state().signup).toBe(true);
      expect(component.state().formTitle).toBe('Create an account');
      expect(component.find('ReduxForm').length).toBe(1);
      expect(tree).toMatchSnapshot();
    });

  test('should close modal when close button is clicked', () => {
    const component = mount(
      <Provider store={configureStore()}>
        <Landing {...props} />
      </Provider>
    );

    const tree = toJson(component);
    const modal = component.find('Modal');

    component.setProps({ match: { path: '/create-account' } });
    modal.find('button.close').simulate('click');

    expect(tree).toMatchSnapshot();
    expect(modal.props().title).toBe('');
    expect(modal.props().openModal).toBe(false);
    expect(props.history.push).toHaveBeenCalledWith('/');
  });
});
