/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { PureTextarea } from '../../../components/common/FormElements';

const props = {
  error: [''],
  handleChange: jest.fn()
};

describe('PureTextarea component ', () => {
  test('expected to render a textarea component', () => {
    const component = mount(<PureTextarea {...props} />);
    const tree = toJson(component);
    expect(component.find('textarea').length).toBe(1);
    expect(component.find('PureTextarea').length).toBe(1);
    expect(tree).toMatchSnapshot();
  });
});
