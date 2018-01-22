/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { Select } from '../../../components/common/FormElements';

const props = {
  handleChange: jest.fn(),
  options: []
};

describe('Select component ', () => {
  test('expected to match snapshot when externalError is passed in as props',
    () => {
      const externalError = {
        error: ['error'],
        touched: true
      };
      const component = mount(
        <Select {...props} externalError={externalError} />
      );
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });

  test('expected to match snapshot when props.meta is passed in as props',
    () => {
      const meta = {
        error: [],
        touched: true
      };
      const component = mount(<Select {...props} meta={meta} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
});
