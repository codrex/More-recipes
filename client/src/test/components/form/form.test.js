/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { Form } from '../../../components/common/FormElements';

const props = {
  pageCount: 5,
  handlePageClick: jest.fn(),
  loading: false
};

describe('Form component ', () => {
  test('expected to match snapshot', () => {
    const component = mount(<Form {...props} />);
    const tree = toJson(component);
    component.find('form').simulate('submit');
    expect(tree).toMatchSnapshot();
  });
});
