/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import RecipeEditor from '../../../components/pages/RecipeEditor';

const props = {
  loading: false,
  hasRender: true,
  submitButtonText: 'post',
  handleButtonClick: jest.fn(),
  hasNotFound: false,
};

describe('Recipe editor component ', () => {
  test('expected to render recipe editor component', () => {
    const component = shallow(<RecipeEditor {...props} />);
    const tree = toJson(component);
    expect(component.find('#recipe-editor').length).toBe(1);
    expect(component.find('.add-recipe-btn').length).toBe(1);
    expect(component.find('.name-category').length).toBe(1);
    expect(component.find('.ingredients').length).toBe(1);
    expect(component.find('.directions').length).toBe(1);
    expect(tree).toMatchSnapshot();
  });

  test('should render NotFound component when recipe is not found',
    () => {
      const component = shallow(
        <RecipeEditor {...{ ...props, hasNotFound: true }} />);
      const tree = toJson(component);
      const notFound = component.find('NotFound').length;
      expect(notFound).toBe(1);
      expect(tree).toMatchSnapshot();
    });
});
