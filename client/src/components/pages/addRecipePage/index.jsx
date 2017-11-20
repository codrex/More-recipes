import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopBar from '../../common/topbar/topbar';
import Loader from '../../common/loader/loader';
import AddDirections from './addDirections/addDirections';
import AddIngredients from './addIngredients/addIngredients';
import RecipeNameAndCategory from './recipeNameAndCategory/recipeNameAndCategory';
import {
  updateAllRecipeField,
  recipeToModify,
  getRecipe,
  newRecipe
} from '../../../actions/recipeActions';

/**
 * Add recipe component
 */
class AddRecipes extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      create: window.location.pathname === '/recipe/create'
    };
    this.isModificationMode = window.location.pathname !== '/recipe/create';
    this.CREATE_RECIPE_SUCCESS = 'Recipe added successfully';
    this.MODIFY_RECIPE_SUCCESS = 'Recipe modified successfully';
  }

  /**
 * @return {undefined}
 */
  componentDidMount() {
    if (!this.state.create) {
      const { createdRecipes } = this.props;
      const id = parseInt(this.props.match.params.id, 10);
      if (createdRecipes.length > 0) {
        const recipe = createdRecipes.find(element => element.id === id);
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
    const create = window.location.pathname === '/recipe/create';
    if (create) {
      this.setState({
        create
      });
      if (this.isModificationMode) window.location.reload();
    }
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
    const { recipe } = nextProps;
    if (recipe !== this.props.recipe) {
      this.props.actions.updateLocalRecipe(recipe);
      return true;
    }
    return true;
  }

  /**
   * @return {undefined}
   */
  render() {
    const { loading } = this.props;
    const { create } = this.state;
    return (
      <div
        className="container"
        style={{
          maxWidth: 'unset'
        }}
      >
        <div className="row">
          <TopBar title={create ? 'Create recipe' : 'Modify recipe'} bottom />
        </div>
        {!loading &&
          <div
            className="row d-flex justify-content-between align-items-start"
            style={{
              margin: '0.5em'
            }}
          >
            <div className="col-xs-11 col-sm-11 col-md-10 col-lg-4 name-category no-padding">
              <div className="col-12">
                <RecipeNameAndCategory
                  postRecipe={create}
                  loading={loading}
                  create={this.CREATE_RECIPE_SUCCESS}
                  modify={this.MODIFY_RECIPE_SUCCESS}
                />
              </div>
            </div>
            <div className="col-xs-11 col-sm-11 col-md-10 col-lg-4 d-flex ingredients no-padding">
              <div className="col-12 item-wrapper">
                <AddIngredients />
              </div>
            </div>
            <div className="col-xs-11 col-sm-11 col-md-10 col-lg-4 d-flex directions no-padding">
              <div className="col-12 item-wrapper">
                <AddDirections />
              </div>
            </div>
          </div>
        }
        {loading && <Loader loading={loading} />}
      </div>
    );
  }
}

AddRecipes.propTypes = {
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  recipe: PropTypes.object,
  createdRecipes: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loading: state.networkRequest.loading,
  createdRecipes: state.user.createdRecipes,
  success: state.networkRequest.success,
});
const mapDispatchToProps = dispatch => ({
  actions: {
    updateLocalRecipe: bindActionCreators(updateAllRecipeField, dispatch),
    recipeToModify: bindActionCreators(recipeToModify, dispatch),
    getRecipe: bindActionCreators(getRecipe, dispatch),
    newRecipe: bindActionCreators(newRecipe, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipes);
