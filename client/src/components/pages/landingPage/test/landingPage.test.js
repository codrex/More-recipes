import React from 'react';
import LandingPage from '../index';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';


describe('Landing page component ', () => {
  test('render as expected ', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
