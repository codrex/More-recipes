import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './form.scss';

export const Input = (props) => {
  const valid = props.meta && props.meta.touched && !props.meta.error && 'valid';
  const invalid = props.meta && props.meta.touched && props.meta.error && 'invalid';

  return (
  <div className="form-group">
    <input
      type={props.type || 'text'}
      className={classnames('form-control text-input',
       props.className, valid, invalid)}
      id={props.id}
      aria-describedby={props.id}
      placeholder={props.placeholder}
      {...props.input}
    />
    <span className="help-text">{props.meta && props.meta.touched && props.meta.error}</span>
  </div>
);
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.object,
};

export const Form = (props) => (
  <form
    className={classnames('col-12 no-margin', props.className)}
    action={props.action}
    method={props.method}
    onSubmit={e => {
      e.preventDefault();
      props.onSubmit();
    }}
  >
    {props.children}
    <button
      type="submit"
      className="btn btn-secondary btn-lg text-white text-uppercase w-100"
    >{props.submitBtnText}
    </button>
  </form>
);

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  action: PropTypes.string,
  method: PropTypes.string,
  className: PropTypes.string,
  submitBtnText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};
