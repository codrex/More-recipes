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
  ingredients: true,
  sendItemsToStore: jest.fn(),
  Component: PureInput
};

describe('AddItems ', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AddItems {...props} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Add item component', () => {
    test('expected to render add item component ', () => {
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
      expect(component.find('Form').length).toBe(1);
      expect(component.find('ItemField').length).toBe(1);
      expect(component.find('ItemsList').length).toBe(1);
    });
  });

  describe('addItem method', () => {
    test('should add ingredient to store ',
      () => {
        const tree = toJson(component);
        const ingredients = ['palm oil', ...props.items];
        component.instance().addItem({ ingredient: 'palm oil' });
        expect(props.sendItemsToStore).toHaveBeenCalledWith(ingredients);
        expect(tree).toMatchSnapshot();
      });

    test('should add direction to store  ',
      () => {
        const tree = toJson(component);
        const directions = [...props.items, 'wash your hands'];
        component.setProps({
          name: 'direction',
          directions: true,
          ingredients: false
        });
        component.instance().addItem({ direction: 'wash your hands' });
        expect(props.sendItemsToStore).toHaveBeenCalledWith(directions);
        expect(tree).toMatchSnapshot();
      });
  });

  describe('deleteFromList method', () => {
    test('should delete an item from the list',
      () => {
        const tree = toJson(component);
        component.instance().deleteFromList(1);
        expect(props.sendItemsToStore).toHaveBeenCalledWith(['rice']);
        expect(tree).toMatchSnapshot();
      });
  });

  describe('editItems method', () => {
    test('should edit an item on the list ',
      () => {
        const tree = toJson(component);
        component.instance().editItems('native rice', 0);
        expect(props.sendItemsToStore)
          .toHaveBeenCalledWith(['native rice', 'beans']);
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
