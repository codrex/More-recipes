import React from 'react';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configStore';
import ItemsList from '../../../components/pages/RecipeEditor/AddItems/ItemsList';

const props = {
  deleteItem: jest.fn(),
  editItem: jest.fn(),
  items: [{}],
  name: 'directions',
  directions: true,
  uniquenessChecker: jest.fn()
};

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
