import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../store/configStore';
import AddDirections from '../../components/pages/recipeEditor/addDirections';


const props = {
  clearValidationError: jest.fn(),
  directions: true,
  externalError: [],
  handleSubmit: jest.fn(),
  ingredients: false,
  initialize: jest.fn(),
  items: [],
  name: '',
  placeholder: '',
  sendItemsToStore: jest.fn(),
};

test('Add directions component to render as expected', () => {
  const component = renderer.create(
    <Provider store={configureStore()}>
      <AddDirections {...props} />
    </Provider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

