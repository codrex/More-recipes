import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from '../../../common/form/form';
import Input from '../../../common/form/input';
import { hasRecipeNameAndCategory } from '../../../../validator/validator';
import { updateNameCategory, createRecipe, modifyRecipe } from '../../../../actions/recipeActions';


const RecipeNameAndCategory = (props) => {

  const { handleSubmit } = props;

  const onSubmitClick = (value) => {
    const recipe = Object.assign({}, props.newRecipe);
    recipe.recipeName = value.recipeName;
    recipe.category = value.category;

    // when submit btn is clicked, a new recipe is created,
    // if there is no id or modify the existing recipe with the given recipe id.

    if (props.newRecipe.id) {
      props.actions.modifyRecipe(recipe);
    } else {
      props.actions.postRecipe(recipe);
    }

    props.actions.updateStore(value);
  };

  return (
    <div>
      <h4 className="lead items-header-text">
        Name and category
      </h4>
      <Form
        submitBtnText={props.newRecipe.id ? 'modify recipe' : 'Post Recipe'}
        primary
        onSubmit={handleSubmit(onSubmitClick)}
      >
        <Field
          component={Input}
          name="recipeName"
          type="text"
          id="recipeName"
          placeholder="Enter recipe name"
          helpTextClassName="text-white"
        />
        <Field
          component={Input}
          name="category"
          type="text"
          id="category"
          placeholder="Enter recipe category"
          helpTextClassName="text-white"
        />
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateStore: bindActionCreators(updateNameCategory, dispatch),
    postRecipe: bindActionCreators(createRecipe, dispatch),
    modifyRecipe: bindActionCreators(modifyRecipe, dispatch)
  }
});

const mapStateToProps = (state) => (
  {
    newRecipe: state.newRecipe,
  }
);

RecipeNameAndCategory.propTypes = {
  handleSubmit: PropTypes.func,
  actions: PropTypes.object,
  newRecipe: PropTypes.object,

};

export default reduxForm({
  validate: hasRecipeNameAndCategory,
  form: 'recipeNameAndCategory'
})(connect(mapStateToProps, mapDispatchToProps)(RecipeNameAndCategory));
