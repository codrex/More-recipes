import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopBar from '../../common/topbar/topbar';
import Loader from '../../common/loader/loader';
import Button from '../../common/button/button';
import AddDirections from './addDirections/addDirections';
import AddIngredients from './addIngredients/addIngredients';
import RecipeNameAndCategory from './recipeNameAndCategory/recipeNameAndCategory';
import RecipeImage from './recipeImage/recipeImage';
import { resetSuccess } from '../../../actions/ajaxActions';
import {
  RECIPE_ADDED,
  RECIPE_MODIFIED,
  MODIFY_RECIPE_PATH,
  CREATE_RECIPE_PATH
} from '../../../constants/constants';
import {
  updateAllRecipeField,
  modifyRecipe,
  getRecipe,
  newRecipe,
  aboutToCreateRecipe,
  createRecipe
} from '../../../actions/recipeActions';

/**
 * Add recipe component
 */
class AddRecipes extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.isModifyRecipe = match.path === MODIFY_RECIPE_PATH;
    this.recipeId = parseInt(match.params.id, 10);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    const { match, actions, recipe } = this.props;
    if (match.path === MODIFY_RECIPE_PATH) {
      if (recipe.recipeId !== this.recipeId) {
        if (!isNaN(this.recipeId)) {
          actions.getRecipe(this.recipeId);
        } else { console.log('recipe not found'); }
      }
    } else {
      actions.aboutToCreateRecipe();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { message, actions, match } = nextProps;

    if (message === RECIPE_ADDED || message === RECIPE_MODIFIED) {
      actions.resetSuccessMessage();
      nextProps.history.push(`/recipe/${nextProps.recipe.id}`);
    }
    const { path } = match;
    if (path === CREATE_RECIPE_PATH && this.isModifyRecipe) {
      actions.aboutToCreateRecipe();
      this.isModifyRecipe = path === MODIFY_RECIPE_PATH;
    }
  }

  handleButtonClick() {
    const { recipe, actions } = this.props;

    if (this.isModifyRecipe) {
      actions.modifyRecipe(recipe, RECIPE_MODIFIED);
    } else {
      actions.createRecipe(recipe, RECIPE_ADDED);
    }
  }
  renderBody = () => {
    const {
      loading,
      recipe,
    } = this.props;
    const hasRecipeToModify = this.isModifyRecipe && recipe.id === this.recipeId;
    const isCreateRecipe = !this.isModifyRecipe;
      return (
        <div>
          <div
            className="row d-flex justify-content-between align-items-start"
            style={{
              margin: '0.5em'
            }}
          >
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 name-category no-padding">
            {/*
              hasRecipeToModify will prevent RecipeNameAndCategory from rendering until
              recipe props is available
             */}
              {hasRecipeToModify && <RecipeNameAndCategory />}
              {isCreateRecipe && <RecipeNameAndCategory />}
              <RecipeImage />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 d-flex ingredients no-padding">
              <AddIngredients />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 d-flex directions no-padding">
              <AddDirections />
            </div>
            <Button
            text={this.isModifyRecipe ? 'modify recipe' : 'post recipe'}
            className="btn-secondary btn-lg w-100 text-uppercase add-recipe-btn"
            handleClick={this.handleButtonClick}
          />
          </div>
        </div>
      );
  }

  /**
   * @return {undefined}
   */
  render() {
    const {
      loading,
      history
    } = this.props;
    return (
      <div
        className="container main"
        style={{maxWidth: 'unset'}}
      >
        {this.renderBody()}
        {loading && <Loader loading={loading} />}
      </div>
    );
  }
}

AddRecipes.propTypes = {
  actions: PropTypes.object.isRequired,
  createdRecipes: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.shape),
  recipe: PropTypes.object,
};

const mapStateToProps = state => ({
  loading: state.networkRequest.loading,
  createdRecipes: state.user.createdRecipes,
  success: state.networkRequest.success,
  message: state.networkRequest.msg,
  recipe: state.recipe,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    updateLocalRecipe: bindActionCreators(updateAllRecipeField, dispatch),
    modifyRecipe: bindActionCreators(modifyRecipe, dispatch),
    getRecipe: bindActionCreators(getRecipe, dispatch),
    newRecipe: bindActionCreators(newRecipe, dispatch),
    aboutToCreateRecipe: bindActionCreators(aboutToCreateRecipe, dispatch),
    resetSuccessMessage: bindActionCreators(resetSuccess, dispatch),
    createRecipe: bindActionCreators(createRecipe, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipes);
