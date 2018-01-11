import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configStore';
import AddIngredients from '../../../components/pages/RecipeEditor/AddIngredients';


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

describe('Add ingredients component ', () => {
  test('expected to match snapshot', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
        <AddIngredients {...props} />
      </Provider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
