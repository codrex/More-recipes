import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Input = (props) => {
  const { meta } = props;
  const valid = meta && meta.touched && !meta.error && 'valid';
  const invalid = meta && meta.touched && meta.error && 'invalid';
  return (
    <div className={classnames('form-group', props.fgClassName)}>
      <input
        type={props.type || 'text'}
        className={classnames('form-control text-input',
        props.className, valid, invalid)}
        id={props.id}
        aria-describedby={props.id}
        placeholder={props.placeholder}
        autoComplete={'false'}
        {...props.input}
      />
      {
      meta && meta.touched && meta.error && meta.error.map((error, i) =>
        (
          <div
            key={i}
            className={
              classnames(props.meta &&
              props.meta.touched &&
              props.meta.error ? 'help-text' : '', props.helpTextClassName)
            }
          >
            {error}
          </div>
        )
      )
    }
    </div>
  );
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
