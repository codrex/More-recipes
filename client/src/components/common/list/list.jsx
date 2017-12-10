import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const ListItem = props => (
  <div className={classnames('lead list-item', props.className)}>
    {props.content && <div
      className="list-item-text lead"
      data-index={props.index && props.index + 1}
      onClick={props.handleClick}
      role="button"
      tabIndex="0"
    >
      {props.content}
    </div>}
    {props.children}
  </div>
);
ListItem.defaultProps = {
  children: null,
  className: '',
  handleClick: () => {},
  index: 0,
  content: ''
};

ListItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

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

