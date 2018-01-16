/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import ItemsList
  from '../../../components/pages/RecipeEditor/AddItems/ItemsList';

const props = {
  deleteItem: jest.fn(),
  editItem: jest.fn(),
  items: [''],
  name: 'directions',
  directions: true,
  uniquenessChecker: jest.fn()
};

describe('Items list component ', () => {
  test('expected to match snapshot', () => {
    const component = shallow(<ItemsList {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
