import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Input from '../../../common/form/input';
import Form from '../../../common/form/form';
import IngredientList from './ingredientList';
import { validateIngredient } from '../../../../validator/validator';
import './addIngredient.scss';

/**
 * React component to add recipe ingredients
 */
class AddIngredient extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    };
    this.addIngredients = this.addIngredients.bind(this);
    this.editIngredients = this.editIngredients.bind(this);
    this.deleteFromList = this.deleteFromList.bind(this);
  }

  /**
   *
   * @param {String} value
   * @return {undfined} undefined
   */
  addIngredients(value) {
    this.setState(
      {
        ingredients: [value.ingredient].concat(this.state.ingredients)
      }
    );
  }
  /**
   *
   * @param {number} index
   * @return {undfined} undefined
   */
  deleteFromList(index) {
    const { ingredients } = this.state;
    ingredients.splice(index, 1);
    this.setState({ ingredients });
  }
  /**
   *
   * @param {string} value
   * @param {number} index
   * @return {undfined} undefined
   */
  editIngredients(value, index) {
    console.log(value);
    const { ingredients } = this.state;
    ingredients[index] = value;
    this.setState({ ingredients });
  }


  /**
   * @return {object} AddIngredient jsx
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-xs-10 col-sm-6 col-md-8 col-lg-5 ingredients ">
        <div className="ingredients-header">
          <h4 className="lead ingredients-header-text">ingredients </h4>
          <Form
            onSubmit={handleSubmit(this.addIngredients)}
            submitBtnText="add to list"
          >
            <Field
              component={Input}
              name="ingredient"
              type="text"
              id="ingredient"
              placeholder="Enter an ingredient name"
            />
          </Form>
        </div>
        {<IngredientList
          ingredients={this.state.ingredients}
          deleteItem={this.deleteFromList}
          editItem={this.editIngredients}
        />}
      </div>
    );
  }
}

AddIngredient.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  validate: validateIngredient,
  form: 'addIngredient'
})(AddIngredient);
