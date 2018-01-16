import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const ItemField = ({
  Component,
  name,
  placeholder,
  clearValidationError,
  validate,
  validationError
}) => (
  <Field
    component={Component}
    name={name}
    type="text"
    id={name}
    placeholder={placeholder}
    fgClassName="d-flex flex-column no-margin"
    className="no-margin add-item-input"
    validate={validate}
    onFocus={() => clearValidationError({
      [`${name}s`]: ''
    })}
    externalError={{
      touched: true,
      error: validationError
    }}
  />
);

ItemField.propTypes = {
  validate: PropTypes.func.isRequired,
  clearValidationError: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  Component: PropTypes.oneOfType(
    [
      PropTypes.node,
      PropTypes.element,
      PropTypes.func
    ]
  ).isRequired,
  validationError: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.array, PropTypes.bool
    ]
  ).isRequired
};

export default ItemField;
