import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Input component
 * @param {object} props
 * @return {React} react element
 */
const Input = (props) => {
  const {
    helpTextClassName,
    fgClassName,
    className,
    externalError
  } = props;
  const { meta } = props;
  let error;
  let touched;
  if (externalError.error) {
    ({ error, touched } = externalError);
  } else {
    ({ error, touched } = meta);
  }

  const valid = meta && touched && !error && 'valid';
  const invalid = meta && touched && error && 'invalid';
  return (
    <div className={classnames('form-group', fgClassName)}>
      <input
        type={props.type || 'text'}
        className={classnames(
          'form-control text-input',
          className,
          valid,
          invalid
        )}
        id={props.id}
        aria-describedby={props.id}
        placeholder={props.placeholder}
        autoComplete={'false'}
        {...props.input}
      />
      {meta &&
        touched &&
        error &&
        error.map((err, i) => (
          <div
            key={i}
            className={classnames(
              meta && touched && error ? 'help-text' : '',
              helpTextClassName
            )}
          >
            {err}
          </div>
        ))}
    </div>
  );
};

Input.defaultProps = {
  id: '',
  placeholder: '',
  className: '',
  fgClassName: '',
  input: {
  },
  meta: {
  },
  externalError: {
  },
  helpTextClassName: '',
  type: '',
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  fgClassName: PropTypes.string,
  helpTextClassName: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.shape),
  meta: PropTypes.objectOf(PropTypes.shape),
  externalError: PropTypes.objectOf(PropTypes.shape),
};

export default Input;
