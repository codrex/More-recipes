import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Icon = props => (
  <div
    className={classnames('icon-wrapper', props.parentClass, props.active, props.pointer && 'pointer')}
    onClick={props.handleClick}
    onMouseEnter={props.onMouseEnter}
    role="button"
    tabIndex="0"
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

Icon.defaultProps = {
  active: '',
  className: '',
  dataTarget: '',
  dataToggle: '',
  iconClass: '',
  parentClass: '',
  handleClick: () => {},
  children: null,
  pointer: false,
  onMouseEnter: () => {},
};

Icon.propTypes = {
  active: PropTypes.string,
  className: PropTypes.string,
  dataTarget: PropTypes.string,
  dataToggle: PropTypes.string,
  iconClass: PropTypes.string,
  parentClass: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.node,
  pointer: PropTypes.bool,
  onMouseEnter: PropTypes.func,
};
export default Icon;
