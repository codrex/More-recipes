import React from 'react';
import toJson from 'enzyme-to-json';
import { PureRecipeImage } from '../../components/pages/recipeEditor/recipeImage/recipeImage';

global.cloudinary = { openUploadWidget: jest.fn() };
const props = {
  image: '',
  updateImage: jest.fn()
};

describe('Recipe image component ', () => {
  test('render as expected when component is mounted', () => {
    const component = shallow(
      <PureRecipeImage {...props} />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when loadImage button is click', () => {
    const component = shallow(
      <PureRecipeImage {...props} />
    );
    component.find('span').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('render as expected when component receive image as props', () => {
    const component = shallow(
      <PureRecipeImage {...props} />
    );
    component.setProps({ image: '{}' });
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
