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
  test('should render a pagination component', () => {
    const component = shallow(<Paginator {...props} />);
    const tree = toJson(component);
    expect(component.find('nav').length).toBe(1);
    expect(tree).toMatchSnapshot();
  });
});
