import React from 'react';
import AddIngredients from '../addIngredients/addIngredients';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';


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
}

describe('Add ingredients component ', () => {
  test('render as expected', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
        <AddIngredients {...props}/>
      </Provider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
