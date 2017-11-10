import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Form = props => (
  <form
    className={classnames('col-12', props.className)}
    action={props.action}
    method={props.method}
    onSubmit={e => {
      e.preventDefault();
      props.onSubmit();
    }}
  >
    {props.children}
    {props.submitBtnText && <button
      type="submit"
      className={classnames('btn text-uppercase w-100',
      props.secondary && 'btn-secondary',
      props.primary && 'btn-primary',
      props.primaryInverse && 'btn-primary-inverse',
      props.secondaryInverse && 'btn-secondary-inverse',
      props.lg && 'btn-lg',
      props.disabled && 'disable'
      )}
      disabled={props.disabled}
    >{props.disabled && 'loading...' || props.submitBtnText}
    </button>}
  </form>
);

Form.defaultProps = {
  lg: true
};

Form.propTypes = {
  children: PropTypes.any,
  action: PropTypes.string,
  method: PropTypes.string,
  className: PropTypes.string,
  submitBtnText: PropTypes.string,
  onSubmit: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  lg: PropTypes.bool,
  disabled: PropTypes.bool,
  primaryInverse: PropTypes.bool,
  secondaryInverse: PropTypes.bool,
};

export default Form;
