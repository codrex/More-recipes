import React from 'react';
import toJson from 'enzyme-to-json';
import Item from '../../../components/pages/RecipeEditor/AddItems/Item';
import { PureInput } from '../../../components/common/FormElements';

const props = {
  content: 'recipe',
  placeholder: '',
  index: 1,
  handleSubmit: jest.fn(),
  editItem: jest.fn(),
  Component: PureInput,
  ingredients: true,
  delete: jest.fn(),
  uniquenessChecker: jest.fn(),
};

describe('Item component ', () => {
  test('expected to match empty snapshot', () => {
    const component = mount(<Item name="in gredients" {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when edit icon is clicked', () => {
    const component = mount(<Item name="ingredients" {...props} />);
    const editIcon = component.find('ListItemIcons').children().find('#editIcon');
    editIcon.simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when edit icon is clicked', () => {
    const component = mount(<Item name="ingredients" {...props} />);
    const deleteIcon = component.find('ListItemIcons').children().find('#deleteIcon');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when a new value was entered', () => {
    const component = mount(<Item name="ingredients" {...props} />);
    component.setState({ editMode: true, itemValue: 'new value' });
    component.find('Button#saveBtn').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when value to be edited was not changed', () => {
    const component = mount(<Item name="ingredients" {...props} />);
    component.setState({ editMode: true, itemValue: 'recipe' });
    component.find('Button#saveBtn').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when close button is clicked', () => {
    const component = mount(<Item name="ingredients" {...props} />);
    component.setState({ editMode: true });
    component.find('Button#closeBtn').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
