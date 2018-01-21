/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import {
  PureEditProfileForm
} from '../../../components/pages/Profile/EditProfileForm';

const props = {
  update: jest.fn(),
  handleSubmit: jest.fn(),
  submitting: false,
};

describe('EditProfileForm component ', () => {
  test('expected to match snapshot', () => {
    const component = shallow(<PureEditProfileForm {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
