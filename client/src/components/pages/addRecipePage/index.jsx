import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopBar from '../../common/topbar/topbar';
import AddDirections from './addDirections/addDirections';
import AddIngredients from './addIngredients/addIngredients';
import RecipeNameAndCategory from './recipeNameAndCategory/recipeNameAndCategory';
import {
  updateAllRecipeField,
  recipeToModify,
  getRecipe,
  onNewRecipe
} from '../../../actions/recipeActions';
import { ajaxRedirect } from '../../../actions/ajaxActions';

/**
 * Add recipe component
 */
class AddRecipes extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.create = props.match.path === '/recipe/create';
    this.CREATE_RECIPE_SUCCESS = 'Recipe added successfully';
    this.MODIFY_RECIPE_SUCCESS = 'Recipe modified successfully';
  }

  /**
 * @return {undefined}
 */
  componentDidMount() {
    if (!this.create) {
      const id = parseInt(this.props.match.params.id, 10);
      if (this.props.recipes) {
        const recipe = this.props.recipes.find(element => element.id === id);
        this.props.actions.recipeToModify(recipe);
      } else {
        this.props.actions.getRecipe(id);
      }
    } else {
      this.props.actions.newRecipe();
    }
  }
  /**
   * @return {undefined}
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.success.success === this.CREATE_RECIPE_SUCCESS) {
      this.props.actions.newRecipe();
      this.props.actions.clearSuccessMsg({
        success: ''
      });
    }
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
   */
  render() {
    return (
      <div
        className="container"
        style={{
          maxWidth: 'unset'
        }}
      >
        <div className="row">
          <TopBar title={this.create ? 'Add recipe' : 'Modify recipe'} />
        </div>
        <div
          className="row d-flex justify-content-between align-items-start"
          style={{
            margin: '0.5em'
          }}
        >
          <div className="col-xs-11 col-sm-11 col-md-10 col-lg-4 name-category no-padding">
            <div className="col-12">
              <RecipeNameAndCategory
                postRecipe={this.create}
                loading={this.props.loading}
                create={this.CREATE_RECIPE_SUCCESS}
                modify={this.MODIFY_RECIPE_SUCCESS}
              />
            </div>
          </div>
          <div className="col-xs-11 col-sm-11 col-md-10 col-lg-4 d-flex ingredients no-padding">
            <AddIngredients />
          </div>
          <div className="col-xs-11 col-sm-11 col-md-10 col-lg-4 d-flex directions no-padding">
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
  recipes: PropTypes.array,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.ajaxCall > 0,
  redirectUrl: state.redirectUrl,
  // recipes: state.user.createdRecipes,
  success: state.ajaxSuccess
});
const mapDispatchToProps = dispatch => ({
  actions: {
    redirect: bindActionCreators(ajaxRedirect, dispatch),
    updateLocalRecipe: bindActionCreators(updateAllRecipeField, dispatch),
    recipeToModify: bindActionCreators(recipeToModify, dispatch),
    getRecipe: bindActionCreators(getRecipe, dispatch),
    newRecipe: bindActionCreators(onNewRecipe, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipes);
