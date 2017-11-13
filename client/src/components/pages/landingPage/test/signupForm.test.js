import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SignupForm from '../signupForm/signupForm';
import configureStore from '../../../../store/configStore';


describe('sign up form component ', () => {
  test('render as expected ', () => {
    const component = renderer.create(<Provider store={configureStore()}>
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
