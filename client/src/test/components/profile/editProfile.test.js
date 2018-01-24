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
  test('should render an edit profile form', () => {
    const component = shallow(<PureEditProfileForm {...props} />);
    const tree = toJson(component);
    expect(component.find('Form').length).toBe(1);
    expect(component.find('#username').length).toBe(1);
    expect(component.find('#email').length).toBe(1);
    expect(component.find('#fullname').length).toBe(1);
    expect(tree).toMatchSnapshot();
  });
});
