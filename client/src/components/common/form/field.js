import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './form.scss';

export const Input = (props) => (
  <div className="form-group">
    <input
      type={props.type || 'text'}
      className={classnames('form-control text-input', props.className)}
      id={props.id}
      aria-describedby={props.id}
      placeholder={props.placeholder}
    />
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  handleChange: PropTypes.func,
};

