import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './icon.scss';

const Icon = (props) => (
  <div
    className={classnames('icon-wrapper', props.parentClass, props.active)}
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
  children: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  dataTarget: PropTypes.string,
  dataToggle: PropTypes.string,
};
export default Icon;