import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './form.scss';

const Form = props => (
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

export default Form;
