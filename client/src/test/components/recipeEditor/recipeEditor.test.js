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
  test('expected to match snapshot', () => {
    const component = shallow(<RecipeEditor {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  test('expected to render NotFound component when props.hasNotFound is true',
    () => {
      const component = shallow(
        <RecipeEditor {...{ ...props, hasNotFound: true }} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
});
