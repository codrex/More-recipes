import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Icon = (props) => (
  <div
    className={classnames('icon-wrapper',
    props.parentClass, props.active, props.pointer && 'pointer')}
    onClick={props.handleClick}
    onMouseEnter={props.onMouseEnter}
  >
    <i
      className={classnames('icon', props.iconClass, props.className)}
      data-toggle={props.dataToggle}
      data-target={props.dataTarget}
    >
      <span>{props.children}</span>
    </i>
  </div>
  );

Icon.propTypes = {
  iconClass: PropTypes.string,
  parentClass: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.any,
  dataTarget: PropTypes.string,
  dataToggle: PropTypes.string,
  pointer: PropTypes.bool,
  onMouseEnter: PropTypes.func,
};
export default Icon;
