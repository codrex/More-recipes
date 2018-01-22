/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import {
  PureRecipeImage
} from '../../../components/pages/RecipeEditor/RecipeImage';

global.cloudinary = { openUploadWidget: jest.fn() };
const props = {
  image: '',
  updateImage: jest.fn()
};

describe('Recipe image component ', () => {
  let component;
  beforeEach(() => {
    component = mount(<PureRecipeImage {...props} />);
  });
  test('expected to match snapshot',
    () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });

  test('expected to match snapshot when loadImage button is clicked',
    () => {
      component.find('span.btn.bg-secondary').simulate('click');
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });

  test('expected to match snapshot when component receive image as props',
    () => {
      component.setProps({ image: '{}' });
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
});
