import React from 'react';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import $ from 'jquery';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SmartLandingPage, { LandingPage } from '../index';
import configureStore from '../../../../store/configStore';

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
  match: { path:'/' }
}

describe('Landing page component ', () => {
  test('expected to match snapshot ', () => {
    const component = mount(
      <Provider store={configureStore()}>
        <BrowserRouter>
          <SmartLandingPage {...props} />
        </BrowserRouter>
      </Provider>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when user is trying to login ', () => {
    const component = shallow(
      <Provider store={configureStore()}>
        <BrowserRouter>
          <SmartLandingPage {...{...props, match:{path:'/login'} }} />
        </BrowserRouter>
      </Provider>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when user is trying to signup', () => {
    const component = mount(
      <Provider store={configureStore()}>
        <BrowserRouter>
        <SmartLandingPage {...{...props, match:{path:'/create-account'} }} />
        </BrowserRouter>
      </Provider>
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when user is signed in', () => {
    const component = shallow(
        <LandingPage {...{...props, match:{path:'/create-account'} }} />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
    component.instance().props = {
      auth: {
        authenticated: true,
      },
      match: { path:'/' }
    }
    expect(tree).toMatchSnapshot();
  });
});
