import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../store/configStore';
import SignupForm from '../../components/pages/landing/signupForm';

describe('sign up form component ', () => {
  test('render as expected ', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
      <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
    </Provider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
