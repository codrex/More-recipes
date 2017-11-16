import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PureTextarea = props => {
  const { helpTextClassName, fgClassName, className, error } = props;
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
      >
      </textarea>
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

PureTextarea.defaultProps = {
  id: '',
  placeholder: '',
  className: '',
  fgClassName: '',
  input: {},
  error: [],
  value: ''
};

PureTextarea.propTypes = {
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

export default PureTextarea;
