/* eslint-disable react/jsx-filename-extension */
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

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('expected to render ListItem when props.ingredients is true',
    () => {
      const tree = toJson(component);
      const ListItem = component.find('ListItem');
      expect(ListItem.length).toBe(1);
      expect(tree).toMatchSnapshot();
    });

  test('expected to render Accordion when props.directions is true', () => {
    component.setProps({ directions: true, ingredients: false });
    const tree = toJson(component);
    const Accordion = component.find('Accordion');
    expect(Accordion.length).toBe(1);
    expect(tree).toMatchSnapshot();
  });

  test('expected to render item edit form when edit item icon is clicked',
    () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
      component.find('ListItemIcons').children().find('#editIcon>.icon-wrapper')
        .simulate('click');
      expect(component.instance().state.editMode).toBe(true);
      const itemEditForm = component.find('Form.item-edit-form');
      expect(itemEditForm.length).toBe(1);
      expect(tree).toMatchSnapshot();
    });

  test('should remove item from the list when delete item icon is clicked',
    () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
      component.find('ListItemIcons').children().find('#deleteIcon')
        .simulate('click');
      expect(props.delete).toHaveBeenCalledWith(1);
      expect(tree).toMatchSnapshot();
    });

  test(`expected save changes made during item edit when save button
  is clicked`, () => {
      const spy = spyOn(component.instance(), 'saveItemAfterEditing');
      const tree = toJson(component);
      const editIcon = component.find('ListItemIcons').find('Icon#editIcon');

      component.setState({ itemValue: 'new value' });
      editIcon.simulate('click');
      component.find('Button#saveBtn').simulate('click');
      expect(component.state().itemValue).toBe('new value');
      expect(spy).toBeCalled();
      expect(tree).toMatchSnapshot();
    });

  test('expected close item edit form when close button is clicked',
    () => {
      const spy = spyOn(component.instance(), 'changeEditMode');
      const tree = toJson(component);
      const editIcon = component.find('ListItemIcons').find('Icon#editIcon');
      editIcon.simulate('click');
      component.find('Button#closeBtn').simulate('click');
      expect(spy).toBeCalled();
      expect(tree).toMatchSnapshot();
    });
});
