import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PureInput = props => {
  const { helpTextClassName, fgClassName, className, error } = props;
  const valid = !error && 'valid';
  const invalid = error && 'invalid';
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
        {...props.input}
        onChange={props.handleChange}
        value={props.value}
      />
      {
        error &&
        error.map((err, i) => (
          <div
            key={i}
            className={classnames(error ? 'help-text' : '', helpTextClassName)}
          >
            {err}
          </div>
        ))}
    </div>
  );
};

PureInput.defaultProps = {
  id: '',
  placeholder: '',
  className: '',
  fgClassName: '',
  input: {},
  error: [],
  value: ''
};

PureInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  fgClassName: PropTypes.string,
  helpTextClassName: PropTypes.string,
  input: PropTypes.object,
  error: PropTypes.array,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default PureInput;
