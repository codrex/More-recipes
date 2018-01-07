import React from 'react';
import toJson from 'enzyme-to-json';
import { PureRecipeImage } from '../../../components/pages/RecipeEditor/RecipeImage';

global.cloudinary = { openUploadWidget: jest.fn() };
const props = {
  image: '',
  updateImage: jest.fn()
};

describe('Recipe image component ', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <PureRecipeImage {...props} />
    );
  });
  test('render as expected when component is mounted', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when loadImage button is click', () => {
    component.find('span').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when component receive image as props', () => {
    component.setProps({ image: '{}' });
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
