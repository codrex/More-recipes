import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './button.scss';

const Button = (props) => (
  <button
    type={props.type || 'button'}
    className={classnames('btn text-capitalize', props.className)}
    data-dismiss="modal"
    data-toggle={props.dataToggle}
    data-target={props.dataTarget}
    onClick={props.handleClick}
  >
    {props.text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  dataToggle: PropTypes.string,
  dataTarget: PropTypes.string,
};

export default Button;
