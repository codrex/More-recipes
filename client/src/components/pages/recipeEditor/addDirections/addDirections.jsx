import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AddItems from '../addItems';
import {
  updateDirections,
  clearValidationError
} from '../../../../actions/recipeActions';

const AddDirections = props => (
  <AddItems
    name="direction"
    directions
    placeholder="Enter direction"
    {...props}
  />
);

const mapStateToProps = state => (
  {
    items: state.recipe.directions,
    externalError: state.recipeValidationError.directions,
    message: state.networkRequest.msg
  }
);

export default reduxForm({
  form: 'directionForm'
})(connect(mapStateToProps, {
  sendItemsToStore: updateDirections,
  clearValidationError
})(AddDirections));
