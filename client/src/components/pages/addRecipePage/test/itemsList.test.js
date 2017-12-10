import React from 'react';
import ItemsList from '../addItems/itemsList';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';


const props = {
  deleteItem: jest.fn(),
  editItem: jest.fn(),
  items: [{}],
  name: 'directions',
  directions: true
}
describe('Items list component ', () => {
  test('render as expected', () => {
    const component = shallow(
      <Provider store={configureStore()}>
        <ItemsList {...props} />
      </Provider>);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
