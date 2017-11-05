import React from 'react';
import { AddDirections } from '../addDirections/addDirections';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';


test('Add directions component to render as expected', () => {
  const component = renderer.create(
    <Provider store={configureStore()}>
      <AddDirections />
    </Provider>
);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
