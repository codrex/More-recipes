import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './icon.scss';

const Icon = (props) => (
  <div className="icon-wrapper" tab="1" >
    <i
      className={classnames('icon', props.iconClass, props.className)}
      onClick={props.handleClick}
      tab="1"
    >
      <span>{props.children}</span>
    </i>
  </div>
  );

Icon.propTypes = {
  iconClass: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
};
export default Icon;
