import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from '../../common/icon/icon';
import AddDirections from './addDirections/addDirections';
import AddIngredients from './addIngredients/addIngredients';
import RecipeNameAndCategory from './recipeNameAndCategory/recipeNameAndCategory';
import { createRecipe, updateAllRecipeField } from '../../../actions/recipeActions';
import { ajaxRedirect } from '../../../actions/ajaxActions';
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
 *
 * @param {object} nextProps
 * @return {bool} true or false
 */
  shouldComponentUpdate(nextProps) {
    if (nextProps.redirectUrl === '/') {
      this.props.actions.redirect('/recipe/create');
      this.props.history.push(nextProps.redirectUrl);
      return false;
    }
    if (nextProps.recipe !== this.props.recipe) {
      this.props.actions.updateLocalRecipe(nextProps.recipe);
      return true;
    }
    return true;
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
              <RecipeNameAndCategory createRecipe={createRecipe} />
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
  actions: PropTypes.object,
  loading: PropTypes.bool,
  redirectUrl: PropTypes.string,
  history: PropTypes.object,
  redirect: PropTypes.func,
  recipe: PropTypes.object,

};

const mapStateToProps = (state) => (
  {
    loading: state.ajaxCall > 0,
    redirectUrl: state.redirectUrl,
    recipe: state.recipe,
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      redirect: bindActionCreators(ajaxRedirect, dispatch),
      updateLocalRecipe: bindActionCreators(updateAllRecipeField, dispatch)
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipes);
