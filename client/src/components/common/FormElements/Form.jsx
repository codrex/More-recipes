import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Form component
 * @param {object} props
 * @return {React} react element
 */
const Form = props => (
  <form
    className={classnames('col-12', props.className)}
    action={props.action}
    method={props.method}
    style={props.style}
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    {props.children}
    {props.submitBtnText && <button
      type="submit"
      id={props.id}
      className={classnames('btn text-capitalize w-100',
        props.secondary && 'btn-secondary',
        props.primary && 'btn-primary',
        props.primaryInverse && 'btn-primary-inverse',
        props.secondaryInverse && 'btn-secondary-inverse',
        props.lg && 'btn-lg',
        props.disabled && 'disable'
      )}
      disabled={props.disabled}
    >{(props.disabled && 'loading...') || props.submitBtnText}
    </button>}
  </form>
);

Form.defaultProps = {
  lg: true,
  children: null,
  action: '',
  method: '',
  className: '',
  submitBtnText: '',
  onSubmit: () => {},
  primary: false,
  secondary: false,
  disabled: false,
  primaryInverse: false,
  secondaryInverse: false,
  id: 'submit',
  style: {}
};

Form.propTypes = {
  children: PropTypes.node,
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
  style: PropTypes.objectOf(PropTypes.shape),
  id: PropTypes.string,
};

export default Form;
