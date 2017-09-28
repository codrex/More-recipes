import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Field, reduxForm } from 'redux-form';
import Form from '../../common/form/form';
// import  from '../../common/form/form';
import Input from '../../common/form/input';
import Icon from '../../common/icon/icon';
import AddDirections from './addDirections/addDirections';
import AddIngredients from './addIngredients/addIngredients';
import { hasRecipeNameAndCategory } from '../../../validator/validator';
import { createRecipe, updateNameCategory } from '../../../actions/recipeActions';
import toastrConfig from '../../.././toastr/config';
import './addRecipe.scss';

/**
 * Add recipe component
 */
class AddRecipes extends React.Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  /**
   * @return {undefined}
   * @param {Object} values
   */
  saveRecipe(values) {
    this.props.actions.updateStore(values);
  }
  /**
   * @return {undefined}
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container-fluid no-padding ">
        <div className="row d-flex">
          <div className="col-xs-9 col-sm-9 col-md-10 col-lg-4 name-category no-padding">
            <h4 className="lead items-header-text">
              Add recipe
              <Icon
                iconClass="fa fa-plus"
                className="float-right"
                handleClick={this.newItem}
              />

            </h4>
            <div className="col-12">
              <Form
                submitBtnText="Post Recipe"
                primary
                onSubmit={handleSubmit(this.saveRecipe)}
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
          </div>
          <div className="col-xs-9 col-sm-9 col-md-10 col-lg-4 d-flex ingredients no-padding">
            <AddIngredients />
          </div>
          <div className="col-xs-9 col-sm-9 col-md-10 col-lg-4 d-flex directions no-padding">
            <AddDirections />
          </div>
        </div>
      </div>
    );
  }
}

AddRecipes.propTypes = {
  handleSubmit: PropTypes.func,
  actions: PropTypes.object,
  reqError: PropTypes.object,
  reqSuccess: PropTypes.object,
  loading: PropTypes.bool,
  updateStore: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    postRecipe: bindActionCreators(createRecipe, dispatch),
    updateStore: bindActionCreators(updateNameCategory, dispatch)
  }
});

const mapStateToProps = (state) => (
  {
    loading: state.ajaxCall > 0,
    reqError: state.ajaxError,
    reqSuccess: state.ajaxSuccess
  }
);

export default reduxForm({
  form: 'addRecipeForm',
  validate: hasRecipeNameAndCategory,
})(connect(mapStateToProps, mapDispatchToProps)(AddRecipes));
