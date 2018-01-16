import React from 'react';
import PropTypes from 'prop-types';

/**
 * NotFound component
 * @param {object} props
 * @return {React} react element
 */
const NotFound = props => (
  <div className={
    `
      display-3
      text-uppercase
      msg-display
      no-margin
      d-flex
      flex-column
   `}
  >
    <h1 className="not-found-text">
      <i className="fa fa-meh-o" />
      <em>oops!</em>
      <br />
      {props.message}
    </h1>
    {props.children}
  </div>
);

NotFound.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
};
NotFound.defaultProps = {
  message: '',
  children: null
};
export default NotFound;
