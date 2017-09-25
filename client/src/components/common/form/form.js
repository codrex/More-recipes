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
      className="btn btn-secondary btn-lg text-white text-uppercase w-100"
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
};

export default Form;
