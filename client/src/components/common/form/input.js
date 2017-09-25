import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './form.scss';

const Input = (props) => {
  const valid = props.meta && props.meta.touched && !props.meta.error && 'valid';
  const invalid = props.meta && props.meta.touched && props.meta.error && 'invalid';
  return (
    <div className={classnames('form-group', props.fgClassName)}>
      <input
        type={props.type || 'text'}
        className={classnames('form-control text-input',
        props.className, valid, invalid)}
        id={props.id}
        aria-describedby={props.id}
        placeholder={props.placeholder}
        {...props.input}
      />
      <span className={props.meta && props.meta.touched && props.meta.error ? 'help-text' : ''}>
      {props.meta && props.meta.touched && props.meta.error}
      </span>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  fgClassName: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default Input;
