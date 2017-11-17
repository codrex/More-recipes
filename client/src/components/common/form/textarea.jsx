import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Textarea = (props) => {
<<<<<<< HEAD
  const valid = props.meta && props.meta.touched && !props.meta.error && 'valid';
  const invalid = props.meta && props.meta.touched && props.meta.error && 'invalid';
=======
  const {
 meta,
    fgClassName,
    className
} = props;
  const { error, touched } = meta;
  const valid = meta && touched && !error && 'valid';
  const invalid = meta && touched && error && 'invalid';
>>>>>>> bug(add-recipe-page): fix bugs in add recipe page
  return (
    <div className={classnames('form-group', props.fgClassName)}>
      <textarea
        className={classnames('form-control text-area', props.className, valid, invalid)}
        id={`${props.id}Textarea`}
        aria-describedby={`${props.id}Textarea`}
        placeholder={props.placeholder}
        {...props.input}
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
  input: {

  },
  meta: {

  },
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
