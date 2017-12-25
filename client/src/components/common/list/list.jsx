import React from 'react';
import PropTypes from 'prop-types';

export const List = props => (
  <div className={`col-12 ${props.className}`} style={props.style}>
    {props.children}
  </div>
);
List.defaultProps = {
  style: {
  },
  className: ''
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(PropTypes.shape),
  className: PropTypes.string,
};

export default List;
