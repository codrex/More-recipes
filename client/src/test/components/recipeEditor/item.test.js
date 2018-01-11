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
  let component;
  beforeEach(() => {
    component = mount(<Item name="ingredients" {...props} />);
  });
  test('expected to match snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when edit icon is clicked', () => {
    const editIcon = component.find('ListItemIcons').children().find('#editIcon');
    editIcon.simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when edit icon is clicked', () => {
    const deleteIcon = component.find('ListItemIcons').children().find('#deleteIcon');
    deleteIcon.simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when a new value was entered', () => {
    component.setState({ editMode: true, itemValue: 'new value' });
    component.find('Button#saveBtn').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when value to be edited was not changed', () => {
    component.setState({ editMode: true, itemValue: 'recipe' });
    component.find('Button#saveBtn').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when close button is clicked', () => {
    component.setState({ editMode: true });
    component.find('Button#closeBtn').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
