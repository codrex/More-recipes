/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import ItemsList
  from '../../../components/pages/RecipeEditor/AddItems/ItemsList';

const props = {
  deleteItem: jest.fn(),
  editItem: jest.fn(),
  items: ['item one', 'item two'],
  name: 'directions',
  directions: true,
  uniquenessChecker: jest.fn()
};

describe('Items list component ', () => {
  test('expected to render a list of items', () => {
    const component = shallow(<ItemsList {...props} />);
    const tree = toJson(component);
    expect(component.find('Item').length).toBe(2);
    expect(tree).toMatchSnapshot();
  });
});
