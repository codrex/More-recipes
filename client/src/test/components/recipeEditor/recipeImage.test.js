/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import {
  PureRecipeImage
} from '../../../components/pages/RecipeEditor/RecipeImage';

global.cloudinary = {
  createUploadWidget: () => (
    { open: jest.fn() }
  )
};
const props = {
  image: '',
  updateImage: jest.fn()
};

describe('Recipe image component ', () => {
  let component;
  beforeEach(() => {
    component = mount(<PureRecipeImage {...props} />);
  });
  test('expected to render recipe image component',
    () => {
      const tree = toJson(component);
      expect(component.find('RecipeImage').length).toBe(1);
      expect(tree).toMatchSnapshot();
    });

  test(`expected to open cloudinary upload widget when upload image button
  is clicked`,
    () => {
      const tree = toJson(component);
      component.find('span.btn.bg-secondary').simulate('click');
      expect(component.instance().uploader.open).toBeCalled();
      expect(tree).toMatchSnapshot();
    });

  test('expected to set state when component receive image as props',
    () => {
      component.setProps({ image: '{}' });
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
});
