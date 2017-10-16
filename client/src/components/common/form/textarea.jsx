import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './form.scss';

const Textarea = (props) => {
  const valid = props.meta && props.meta.touched && !props.meta.error && 'valid';
  const invalid = props.meta && props.meta.touched && props.meta.error && 'invalid';
  return (
    <div className={classnames('form-group', props.fgClassName)}>
      <textarea
        className={classnames('form-control text-input',
        props.className, valid, invalid)}
        id={`${props.id}Textarea`}
        aria-describedby={`${props.id}Textarea`}
        placeholder={props.placeholder}
        {...props.input}
      >
      </textarea>
      <div className={props.meta && props.meta.touched && props.meta.error ? 'help-text' : ''}>
      {props.meta && props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  fgClassName: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default Textarea;
