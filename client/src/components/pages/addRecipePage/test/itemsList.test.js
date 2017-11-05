import React from 'react';
import ItemsList from '../addItems/itemsList';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';


describe('Items list component ', () => {
  test('render as expected', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
        <ItemsList items={['item1', 'item2']} name="directions" />
      </Provider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
