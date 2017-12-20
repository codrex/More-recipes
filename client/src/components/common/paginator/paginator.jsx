import React from 'react';
import Paginate from 'react-paginate';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';

const Paginator = props => (
  <nav
    aria-label="Page navigation"
    className="d-flex justify-content-center col-12 "
  >
    <Paginate
      previousLabel={<Icon iconClass="fa fa-angle-double-left" />}
      nextLabel={<Icon iconClass="fa fa-angle-double-right" />}
      breakLabel={<a href="">...</a>}
      breakClassName={'break-me'}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={props.pageCount}
      onPageChange={props.handlePageClick}
      containerClassName={'pagination justify-content-center'}
      subContainerClassName={'page-item'}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item page-link"
      nextClassName="page-item page-link"
      activeClassName={'page-active'}
    />
  </nav>
);

Paginator.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};
export default Paginator;

