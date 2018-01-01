import React from 'react';
import toJson from 'enzyme-to-json';
import Paginator from '../../components/common/paginator';

const props = {
  pageCount: 5,
  handlePageClick: jest.fn(),
  loading: false
};

describe('Paginator component ', () => {
  test('render as expected when component is mounted', () => {
    const component = shallow(
      <Paginator {...props} />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
