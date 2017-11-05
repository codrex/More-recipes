import React from 'react';
import AddDirections from '../addIngredients/addIngredients';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';


describe('Add directions component ', () => {
  test('render as expected', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
        <AddDirections />
      </Provider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
