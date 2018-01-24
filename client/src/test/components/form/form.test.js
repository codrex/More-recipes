/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { Form } from '../../../components/common/FormElements';

const props = {
  pageCount: 5,
  handlePageClick: jest.fn(),
  loading: false,
  onSubmit: jest.fn()
};

describe('Form component ', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('should render a form component', () => {
    const component = mount(<Form {...props} />);
    const tree = toJson(component);
    expect(component.find('form').length).toBe(1);
    expect(component.find('Form').length).toBe(1);
    expect(tree).toMatchSnapshot();
  });

  test('should submit a form when submit event is triggered', () => {
    const component = mount(<Form {...props} />);
    const tree = toJson(component);
    component.find('form').simulate('submit');
    expect(props.onSubmit).toBeCalled();
    expect(tree).toMatchSnapshot();
  });
});
