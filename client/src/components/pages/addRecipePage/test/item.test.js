import React from 'react';
import toJson from 'enzyme-to-json';
import Item from '../addItems/item';
import PureInput from '../../../common/form/pure-input';

const props = {
  content: 'recipe',
  placeholder: '',
  index: 1,
  handleSubmit: jest.fn(),
  editItem: jest.fn(),
  Component: PureInput,
  ingredients: true,
  delete: jest.fn()
};

describe('Item component ', () => {
  test('expected to match empty snapshot', () => {
    const component = mount(<Item name="ingredients" {...props} />);
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
  test('expected to match snapshot when save after edit button is clicked', () => {
    const component = mount(<Item name="ingredients" {...props} />);
    component.setState({ editMode: true });
    component.find('#saveBtn').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when close button is clicked', () => {
    const component = mount(<Item name="ingredients" {...props} />);
    component.setState({ editMode: true });
    component.find('#closeBtn').simulate('click');
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
