import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Input = props => {
  const { meta, helpTextClassName, fgClassName, className } = props;
  const { error, touched } = meta;
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
  input: {},
  meta: {},
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  fgClassName: PropTypes.string,
  helpTextClassName: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default Input;
