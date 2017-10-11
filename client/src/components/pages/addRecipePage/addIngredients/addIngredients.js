import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { validateItems } from '../../../../validator/validator';
import { updateIngredients } from '../../../../actions/recipeActions';
import AddItems from '../addItems/addItems';

const mapDispatchToProps = (dispatch) => (
  {
    sendItemsToStore: bindActionCreators(updateIngredients, dispatch)
  }
);

const mapStateToProps = (state) => (
  { items: state.newRecipe.ingredients, }
);

const AddIngredients = () => {
  const Ingredients = reduxForm({
    validate: validateItems,
    form: 'ingredientForm',
  })(connect(mapStateToProps, mapDispatchToProps)(AddItems));
  return (
    <Ingredients
      name="ingredient"
      ingredients
      placeholder="Enter ingredient"
    />
  );
};

export default AddIngredients;
