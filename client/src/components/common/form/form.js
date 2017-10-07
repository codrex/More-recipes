import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './form.scss';

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
      className={classnames('btn btn-lg text-uppercase w-100',
      props.secondary && 'btn-secondary', props.primary && 'btn-primary')}
    >{props.submitBtnText}
    </button>}
  </form>
);

Form.propTypes = {
  children: PropTypes.any,
  action: PropTypes.string,
  method: PropTypes.string,
  className: PropTypes.string,
  submitBtnText: PropTypes.string,
  onSubmit: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default Form;
