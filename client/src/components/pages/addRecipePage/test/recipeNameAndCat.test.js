import React from 'react';
import RecipeNameAndCategory from '../recipeNameAndCategory/recipeNameAndCategory';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';

const props = {
  handleSubmit: jest.fn(),
  actions: {
    updateStore: jest.fn(),
    postRecipe: jest.fn(),
    modifyRecipe: jest.fn(),
  },
  modify: '',
  create: '',
  loading: false,
}
describe('Recipe name and category component', () => {
  test('render as expected', () => {
    const component = renderer.create(
      <Provider store={configureStore()}>
        <RecipeNameAndCategory {...props} />
      </Provider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

