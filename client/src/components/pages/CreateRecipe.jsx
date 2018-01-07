import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeEditor from './RecipeEditor';
import { resetSuccess } from '../../actions/ajaxActions';
import { RECIPE_ADDED } from '../../constants';
import {
  createRecipe,
  getRecipe,
  resetRecipe
} from '../../actions/recipeActions';

/**
 * CreateRecipe
 */
class CreateRecipe extends React.Component {
  /**
   * constructor
   * @return {undefined}
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    props.resetRecipe();
  }

  /**
   * @returns {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {
      message,
      history,
      resetSuccessMessage
    } = nextProps;

    if (message === RECIPE_ADDED) {
      resetSuccessMessage();
      history.push(`/recipe/${nextProps.recipe.id}`);
    }
  }

  /**
   * post recipe button click event handler
   * @return {undefined}
   */
  postRecipeClicked = () => {
    const { recipe } = this.props;
    this.props.createRecipe(recipe, RECIPE_ADDED);
  }

  /**
   * render
   * @return {React} - react component
   */
  render() {
    const { loading } = this.props;

    return (
      <RecipeEditor
        handleButtonClick={this.postRecipeClicked}
        submitButtonText="post recipe"
        loading={loading}
        hasRender
      />
    );
  }
}

CreateRecipe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  resetRecipe: PropTypes.func.isRequired,
  createRecipe: PropTypes.func.isRequired,
  resetSuccessMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

CreateRecipe.defaultProps = {
  message: '',
};

const mapStateToProps = state => (
  {
    recipe: state.recipe,
    loading: state.networkRequest.loading,
    message: state.networkRequest.msg,
    statusCode: state.currentStatusCode
  }
);

export { CreateRecipe as PureCreateRecipe };
export default connect(mapStateToProps, {
  resetRecipe,
  createRecipe,
  getRecipe,
  resetSuccessMessage: resetSuccess
})(CreateRecipe);
