/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { Select } from '../../../components/common/FormElements';

const props = {
  handleChange: jest.fn(),
  options: []
};

describe('Select component ', () => {
  test('expected to render select component', () => {
    const component = mount(
      <Select {...props} />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  test('expected to render with error when externalError is passed in',
    () => {
      const externalError = {
        error: ['error'],
        touched: true
      };
      const component = mount(
        <Select {...props} externalError={externalError} />
      );
      const tree = toJson(component);
      expect(component.find('.help-text').length).toBe(1);
      expect(tree).toMatchSnapshot();
    });

  test('expected to render with error when props.meta is passed in',
    () => {
      const meta = {
        error: ['error'],
        touched: true
      };
      const component = mount(<Select {...props} meta={meta} />);
      const tree = toJson(component);
      expect(component.find('.help-text').length).toBe(1);
      expect(tree).toMatchSnapshot();
    });
});
