import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateIngredients } from '../../../../actions/recipeActions';
import AddItems from '../addItems/addItems';

const mapDispatchToProps = (dispatch) => (
  {
    sendItemsToStore: bindActionCreators(updateIngredients, dispatch)
  }
);

const mapStateToProps = (state) => (
  {
    items: state.recipe.ingredients,
  }
);

const AddIngredients = () => {
  const Ingredients = reduxForm({
    form: 'ingredientForm',
  })(connect(mapStateToProps, {
    sendItemsToStore: updateIngredients
  })(AddItems));
  return (
    <Ingredients
      name="ingredient"
      ingredients
      placeholder="Enter ingredient"
    />
  );
};

export default AddIngredients;
