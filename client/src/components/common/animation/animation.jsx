import { CSSTransitionGroup } from 'react-transition-group';
import React from 'react';
import PropTypes from 'prop-types';

const Animation = props => (
  <CSSTransitionGroup
    transitionName={props.name}
    transitionAppearTimeout={props.timeOut}
    transitionLeaveTimeout={props.timeOut}
    transitionEnterTimeout={props.timeOut}
    transitionAppear={props.appear}
  >
    {props.children}
  </CSSTransitionGroup>
);

Animation.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  timeOut: PropTypes.number,
  appear: PropTypes.bool
};

Animation.defaultProps = {
  name: 'fade',
  timeOut: 600,
  appear: true
};

export default Animation;
