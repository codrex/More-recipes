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
      onChange={props.handleChange}
      value={props.value}
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

export const Form = (props) => (
  <form
    className={classnames('col-12 no-margin', props.className)}
    action={props.action}
    method={props.method}
  >
    {props.children}
  </form>
);

Form.propTypes = {
  children: PropTypes.oneOf(PropTypes.string, PropTypes.func, PropTypes.object),
  action: PropTypes.string,
  method: PropTypes.string,
  className: PropTypes.string
};
