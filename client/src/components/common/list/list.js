import React from 'react';
import PropTypes from 'prop-types';
import './list.scss';

export const ListItem = (props) => (
  <h4 className="items-list-item lead list-item" data-index={props.index + 1}>
    {props.content}
    {props.children}
  </h4>
);

ListItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.any,
};

export const List = (props) => {
  return (
    <div className="col-12">
      {props.children}
    </div>
  );
};

List.propTypes = {
  children: PropTypes.any,
};

