import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './icon.scss';

const Icon = (props) => (
  <div className="icon-wrapper" >
    <i
      className={classnames('icon', props.iconClass, props.className)}
      onClick={props.handleClick}
    >
    </i>
  </div>
  );

Icon.propTypes = {
  iconClass: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func
};
export default Icon;
