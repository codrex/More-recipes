/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import UserInfo from '../../../components/pages/Profile/UserInfo';

const props = {
  user: { fullname: 'john doe' },
  editBtnClicked: jest.fn(),
};

describe('UserInfo component ', () => {
  test('expected to render user info component', () => {
    const component = shallow(<UserInfo {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
