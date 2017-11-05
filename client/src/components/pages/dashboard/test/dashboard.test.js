import React from 'react';
import Dashboard from '../dashboard';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';


describe('Dashboard component ', () => {
  test('render as expected ', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
        <BrowserRouter>
          <Dashboard user={{}} />
        </BrowserRouter>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
