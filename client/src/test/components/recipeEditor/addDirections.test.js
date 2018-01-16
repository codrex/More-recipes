/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureAddDirections }
  from '../../../components/pages/RecipeEditor/AddDirections';


const props = {
  clearValidationError: jest.fn(),
  directions: true,
  externalError: [],
  handleSubmit: jest.fn(),
  initialize: jest.fn(),
  items: ['directions one', 'directions two'],
  name: 'directions',
  placeholder: 'add a direction',
  sendItemsToStore: jest.fn(),
};
describe('Add directions component', () => {
  test('expected to match snapshot', () => {
    const component = shallow(<PureAddDirections {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});

