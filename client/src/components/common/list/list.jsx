import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const ListItem = (props) => (
  <div className={classnames('lead list-item', props.className)}>
    {props.content && <h4
      className="list-item-text"
      data-index={props.index && props.index + 1}
      onClick={props.handleClick}
    >
    {props.content}
    </h4>}
      {props.children}
  </div>
);

ListItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

export const List = (props) => (
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
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

