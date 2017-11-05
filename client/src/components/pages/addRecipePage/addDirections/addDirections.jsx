import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDirections } from '../../../../actions/recipeActions';
import AddItems from '../addItems/addItems';

const mapDispatchToProps = (dispatch) => (
  {
    sendItemsToStore: bindActionCreators(updateDirections, dispatch)
  }
);
const mapStateToProps = (state) => (
  { items: state.recipe.directions, }
);
export const AddDirections = () => {
  const Directions = reduxForm({
    form: 'directionForm',
  })(connect(mapStateToProps, mapDispatchToProps)(AddItems));
  return (
    <Directions
      name="direction"
      directions
      placeholder="Enter direction"
    />
    );
};

export default AddDirections;
