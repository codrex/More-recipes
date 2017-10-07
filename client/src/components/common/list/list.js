import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './list.scss';

export const ListItem = (props) => (
  <h4
    className={classnames('items-list-item lead list-item', props.className)}
    data-index={props.index && props.index + 1}
  >
    {props.content}
    {props.children}
  </h4>
);

ListItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
};

export const List = (props) => {
  return (
    <div className="col-12" style={props.style}>
      {props.children}
    </div>
  );
};

List.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

