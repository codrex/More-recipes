import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Textarea = (props) => {
  const { meta, fgClassName, className } = props;
  const { error, touched } = meta;
  const valid = meta && touched && !error && 'valid';
  const invalid = meta && touched && error && 'invalid';
  return (
    <div className={classnames('form-group', fgClassName)}>
      <textarea
        className={classnames('form-control text-area', className, valid, invalid)}
        id={`${props.id}Textarea`}
        aria-describedby={`${props.id}Textarea`}
        placeholder={props.placeholder}
        {...props.input}
      >
      </textarea>
      <div className={meta && touched && error ? 'help-text' : ''}>
      {meta && touched && error}
      </div>
    </div>
  );
};
Textarea.defaultProps = {
  id: '',
  placeholder: '',
  className: '',
  fgClassName: '',
  input: {},
  meta: {},
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
