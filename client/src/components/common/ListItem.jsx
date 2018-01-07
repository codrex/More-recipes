import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * ListItem component
 * @param {object} props
 * @return {React} react element
 */
const ListItem = props => (
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

export default ListItem;
