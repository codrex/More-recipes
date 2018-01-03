import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListItem from '../ListItem';

const Accordion = props => (
  <ListItem className={classnames(props.className, 'accordion')}>
    {props.children}
  </ListItem>
);

Accordion.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string
};
Accordion.defaultProps = {
  className: ''
};

export default Accordion;
