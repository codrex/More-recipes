import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactSelect from 'react-select';

/**
 * Select component
 * @param {object} props
 * @return {React} react element
 */
const Select = (props) => {
  const {
    helpTextClassName,
    className,
    fgClassName,
    externalError,
    placeholder,
    value,
    handleChange,
    options
  } = props;

  const { meta } = props;
  let error;
  let touched;

  if (externalError.error) {
    ({ error, touched } = externalError);
  } else {
    ({ error, touched } = meta);
  }

  return (
    <div className={classnames('form-group', fgClassName)}>
      <ReactSelect
        name="form-field-name"
        value={value}
        onChange={handleChange}
        options={options}
        resetValue={value}
        placeholder={placeholder}
        className={className}
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

Select.defaultProps = {
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
  value: ''
};

Select.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  fgClassName: PropTypes.string,
  helpTextClassName: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.shape),
  externalError: PropTypes.objectOf(PropTypes.shape),
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.string,
};

export default Select;
