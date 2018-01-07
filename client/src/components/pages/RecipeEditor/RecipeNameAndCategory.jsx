import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Select, Input } from '../../common/FormElements';
import { recipeName } from '../../../utils/validator';
import { CATEGORIES } from '../../../constants';
import {
  updateName,
  updateCategory,
  clearValidationError as clearError
} from '../../../actions/recipeActions';

/**
 * RecipeNameAndCategory component
 * @param {object} props
 * @return {React} react element
 */
let RecipeNameAndCategory = (props) => {
  const {
    name,
    recipe,
    validationError,
    clearValidationError
  } = props;
  const {
    name: nameError,
    category: categoryError
  } = validationError;
  return (
    <div>
      <h4 className="items-header-text">
        Recipe name and category
      </h4>
      <Form style={{ zIndex: 4 }}>
        <Field
          component={Input}
          name="name"
          type="text"
          id="recipeName"
          placeholder="Enter recipe name"
          className="add-recipe-input"
          validate={value => recipeName(value, 'recipe name')}
          onBlur={() => props.updateName(name)}
          onFocus={() => clearValidationError({
            name: ''
          })}
          externalError={{
            touched: true,
            error: nameError
          }}
        />
        <Select
          name="category"
          type="text"
          id="category"
          placeholder="Select recipe category"
          className="add-recipe-input"
          options={CATEGORIES}
          value={recipe.category}
          handleChange={({ value }) => {
            props.updateCategory(value);
            clearValidationError({
              category: ''
            });
          }}
          externalError={{
            touched: true,
            error: categoryError
          }}
        />
      </Form>
    </div>
  );
};

RecipeNameAndCategory.defaultProps = {
  recipeCategory: '',
  name: ''
};

RecipeNameAndCategory.propTypes = {
  name: PropTypes.string,
  clearValidationError: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  updateName: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  validationError: PropTypes.objectOf(PropTypes.shape).isRequired,
};

// For testing purpose
const PureRecipeNameAndCategory = RecipeNameAndCategory;
export { PureRecipeNameAndCategory };

RecipeNameAndCategory = reduxForm({
  form: 'recipeNameAndCategory',
})(RecipeNameAndCategory);

const selector = formValueSelector('recipeNameAndCategory');

const mapStateToProps = state => ({
  recipe: state.recipe,
  initialValues: { name: state.recipe.name },
  name: selector(state, 'name'),
  validationError: state.recipeValidationError,
});

export default connect(mapStateToProps, {
  updateCategory,
  updateName,
  clearValidationError: clearError
})(RecipeNameAndCategory);
