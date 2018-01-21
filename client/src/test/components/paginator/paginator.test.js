/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import Paginator from '../../../components/common/Paginator';

const props = {
  pageCount: 5,
  handlePageClick: jest.fn(),
  loading: false
};

describe('Paginator component ', () => {
  test('expected to match snapshot', () => {
    const component = shallow(<Paginator {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
