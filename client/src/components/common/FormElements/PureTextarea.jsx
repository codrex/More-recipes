import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * PureTextarea component
 * @param {object} props
 * @return {React} react element
 */
const PureTextarea = (props) => {
  const {
    helpTextClassName,
    fgClassName,
    className,
    error
  } = props;
  const valid = !error && 'valid';
  const invalid = error && 'invalid';
  return (
    <div className={classnames('form-group', fgClassName)}>
      <textarea
        className={classnames('form-control text-area', className, valid, invalid)}
        id={`${props.id}Textarea`}
        aria-describedby={`${props.id}Textarea`}
        placeholder={props.placeholder}
        {...props.input}
        value={props.value}
        onChange={props.handleChange}
        rows="2"
      />
      {
        error &&
        error.map(err => (
          <div
            key={`${err}key`}
            className={classnames(error ? 'help-text' : '', helpTextClassName)}
          >
            {err}
          </div>
        ))}
    </div>
  );
};

PureTextarea.defaultProps = {
  id: '',
  placeholder: '',
  className: '',
  fgClassName: '',
  input: {
  },
  error: [],
  value: '',
  helpTextClassName: ''
};

PureTextarea.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  fgClassName: PropTypes.string,
  helpTextClassName: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.shape),
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default PureTextarea;
