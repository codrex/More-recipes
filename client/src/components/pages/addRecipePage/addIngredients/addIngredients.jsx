import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { updateIngredients } from '../../../../actions/recipeActions';
import AddItems from '../addItems/addItems';

const mapStateToProps = (state) => (
  { items: state.recipe.ingredients, }
);

const AddIngredients = () => {
  const Ingredients = reduxForm({
    form: 'ingredientForm',
  })(connect(mapStateToProps, { sendItemsToStore: updateIngredients })(AddItems));
  return (
    <Ingredients
      name="ingredient"
      ingredients
      placeholder="Enter ingredient"
    />
  );
};

export default AddIngredients;
