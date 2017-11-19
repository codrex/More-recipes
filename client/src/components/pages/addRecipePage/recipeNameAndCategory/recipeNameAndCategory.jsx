import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from '../../../common/form/form';
import Input from '../../../common/form/input';
import { recipeName, category } from '../../../../utils/validator/validator';
import {
  updateNameCategory,
  createRecipe,
  modifyRecipe
} from '../../../../actions/recipeActions';

let RecipeNameAndCategory = props => {
  const { handleSubmit } = props;

  const onSubmitClick = value => {
    if (!props.postRecipe) {
      props.actions.modifyRecipe({
        ...props.recipe, ...value
      }, props.modify);
    } else {
      props.actions.postRecipe({
        ...props.recipe, ...value
      }, props.create);
    }
  };
  return (
    <div>
      <h4 className="lead items-header-text">Name and category</h4>
      <Form
        submitBtnText={
          (props.postRecipe
            ? !props.loading && 'create recipe'
            : !props.loading && 'modify recipe') || 'Loading...'
        }
        secondary
        onSubmit={handleSubmit(onSubmitClick)}
        lg={false}
        disabled={props.loading}
      >
        <Field
          component={Input}
          name="recipeName"
          type="text"
          id="recipeName"
          placeholder="Enter recipe name"
          className="add-recipe-input"
          validate={value => recipeName(value, 'recipe name')}
          onBlur={() => props.actions.updateStore(props.recipeNameAndCategory)}
        />
        <Field
          component={Input}
          name="category"
          type="text"
          id="category"
          placeholder="Enter recipe category"
          className="add-recipe-input"
          validate={value => category(value, 'recipe category')}
          onBlur={() => props.actions.updateStore(props.recipeNameAndCategory)}
        />
      </Form>
    </div>
  );
};
RecipeNameAndCategory.defaultProps = {
  recipe: {
  },
  postRecipe: true,
  recipeNameAndCategory: {
  },
};
RecipeNameAndCategory.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.objectOf(PropTypes.shape),
  postRecipe: PropTypes.bool,
  recipeNameAndCategory: PropTypes.objectOf(PropTypes.shape),
  modify: PropTypes.string.isRequired,
  create: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

RecipeNameAndCategory = reduxForm({
  form: 'recipeNameAndCategory',
  enableReinitialize: true
})(RecipeNameAndCategory);

const selector = formValueSelector('recipeNameAndCategory');

const mapDispatchToProps = dispatch => ({
  actions: {
    updateStore: bindActionCreators(updateNameCategory, dispatch),
    postRecipe: bindActionCreators(createRecipe, dispatch),
    modifyRecipe: bindActionCreators(modifyRecipe, dispatch)
  }
});

const mapStateToProps = state => ({
  recipe: state.recipe,
  initialValues: state.recipe,
  recipeNameAndCategory: selector(state, 'recipeName', 'category')
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RecipeNameAndCategory
);
