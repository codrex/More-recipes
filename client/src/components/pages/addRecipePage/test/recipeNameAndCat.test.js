import React from 'react';
import RecipeNameAndCategory from '../recipeNameAndCategory/recipeNameAndCategory';
import { Provider } from 'react-redux';
import toJSON from "enzyme-to-json"
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
    const component = shallow(
      <Provider store={configureStore()}>
        <RecipeNameAndCategory {...props} />
      </Provider>);
    const tree = toJSON(component);
    expect(tree).toMatchSnapshot();
  });
});

