/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import AddItems from '../../../components/pages/RecipeEditor/AddItems';
import { PureInput } from '../../../components/common/FormElements';

const props = {
  handleSubmit: jest.fn(),
  placeholder: '',
  name: 'ingredient',
  initialize: jest.fn(),
  clearValidationError: jest.fn(),
  externalError: [],
  items: ['rice', 'beans'],
  directions: true,
  sendItemsToStore: jest.fn(),
  ingredients: false,
  Component: PureInput
};

describe('AddItems ', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddItems {...props} />);
  });
  describe('Add item component', () => {
    test('expected to match snapshot ', () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
  describe('addItem method', () => {
    test('should call props.sendItemsToStore  ',
      () => {
        const tree = toJson(component);

        component.instance().addItem({ ingredient: 'palm oil' });
        component.setProps({ name: 'direction', directions: true });
        component.instance().addItem({ direction: 'palm oil' });

        expect(props.sendItemsToStore).toHaveBeenCalledTimes(2);
        expect(tree).toMatchSnapshot();
      });
  });
  describe('deleteFromList method', () => {
    test('should call props.sendItemsToStore',
      () => {
        const tree = toJson(component);
        component.instance().deleteFromList(1);
        expect(props.sendItemsToStore).toBeCalled();
        expect(tree).toMatchSnapshot();
      });
  });
  describe('editItems method', () => {
    test('should call props.sendItemsToStore when editItems method is called ',
      () => {
        const tree = toJson(component);
        component.instance().editItems('rice', 0);
        expect(props.sendItemsToStore).toBeCalled();
        expect(tree).toMatchSnapshot();
      });
  });
  describe('validate method', () => {
    test('should return "ingredient is already on the list" ',
      () => {
        const tree = toJson(component);
        const result = component.instance().validate('rice');
        expect(result).toMatchObject(['ingredient is already on the list']);
        expect(tree).toMatchSnapshot();
      });
  });
});
