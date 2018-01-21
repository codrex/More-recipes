/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureTextarea } from '../../../components/common/FormElements';

const props = {
  error: [''],
  handleChange: jest.fn()
};

describe('PureTextarea component ', () => {
  test('expected to match snapshot', () => {
    const component = mount(<PureTextarea {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
