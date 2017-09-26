import React from 'react';
import { reduxForm } from 'redux-form';
import { validateItems } from '../../../../validator/validator';
import AddItems from '../addItems/addItems';

const AddDirections = () => {
  const Directions = reduxForm({
    validate: validateItems,
    form: 'directionForm',
  })(AddItems);
  return (
    <Directions name="direction" directions />
  );
};

export default AddDirections;
