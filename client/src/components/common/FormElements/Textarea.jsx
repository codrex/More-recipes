import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Textarea component
 * @param {object} props
 * @return {React} react element
 */
const Textarea = (props) => {
  const {
    fgClassName,
    className,
    externalError
  } = props;
  let { meta } = props;
  if (externalError.error) {
    meta = {
      ...meta,
      ...externalError
    };
  }
  const { error, touched } = meta;
  const valid = meta && touched && !error && 'valid';
  const invalid = meta && touched && error && 'invalid';
  return (
    <div className={classnames('form-group', fgClassName)}>
      <textarea
        className={classnames(
          'form-control text-area',
          className,
          valid,
          invalid
        )}
        id={`${props.id}Textarea`}
        aria-describedby={`${props.id}Textarea`}
        placeholder={props.placeholder}
        {...props.input}
        rows={props.row}
      />
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
  row: '1',
  input: {
  },
  meta: {
  },
  externalError: {
  }
};

Textarea.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  fgClassName: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.shape),
  meta: PropTypes.objectOf(PropTypes.shape),
  row: PropTypes.string,
  externalError: PropTypes.objectOf(PropTypes.shape)
};

export default Textarea;
