import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { updateIngredients, clearValidationError } from '../../../../actions/recipeActions';
import AddItems from '../addItems/addItems';

const AddIngredients = props => (
  <AddItems
    name="ingredient"
    ingredients
    placeholder="Enter ingredient"
    {...props}
  />
);

const mapStateToProps = state => (
  {
    items: state.recipe.ingredients,
    externalError: state.recipeValidationError.ingredients,
    message: state.networkRequest.msg
  }
);

export default reduxForm({
  form: 'ingredientForm'
})(connect(mapStateToProps, {
  sendItemsToStore: updateIngredients,
  clearValidationError
})(AddIngredients));
