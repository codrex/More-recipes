import React from 'react';
import Item from '../addItems/item';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';


describe('Item component ', () => {
  test('render as expected', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
        <Item name="directions" />
      </Provider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
