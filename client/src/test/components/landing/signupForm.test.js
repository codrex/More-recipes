import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configStore';
import SignupForm from '../../../components/pages/Landing/SignupForm';

describe('sign up form component ', () => {
  test('expect SignupForm component to match snapshot ', () => {
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
