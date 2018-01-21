import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import RecipeEditor from './RecipeEditor';
import { modifyRecipe, getRecipe } from '../../actions/recipeActions';
import { resetSuccess } from '../../actions/ajaxActions';
import { RECIPE_MODIFIED } from '../../constants';
import toastrConfig from '../../toastr/config';

/**
 * ModifyRecipe
 */
class ModifyRecipe extends React.Component {
  /**
   * constructor
   * @return {undefined}
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      hasNotFound: false,
    };
    this.recipeId = parseInt(this.props.match.params.id, 10);
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    if (!isNaN(this.recipeId)) {
      this.props.getRecipe(this.recipeId);
    } else if (!this.state.hasNotFound) {
      // eslint-disable-next-line
      this.setState({ hasNotFound: true });
      toastr.error('Sorry, recipe not found', 'Error', toastrConfig);
    }
  }

  /**
   * @returns {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {
      message,
      statusCode,
      history,
      resetSuccessMessage
    } = nextProps;

    if (message === RECIPE_MODIFIED) {
      resetSuccessMessage();
      history.push(`/recipe/${nextProps.recipe.id}`);
    }

    if (statusCode === 404 && !this.state.hasNotFound) {
      this.setState({ hasNotFound: true });
    }
  }

  /**
   * @return {undefined}
   */
  modifyButtonClicked = () => {
    const { recipe } = this.props;
    this.props.modifyRecipe(recipe, RECIPE_MODIFIED);
  }

  /**
   * render
   * @return {React} - react component
   */
  render() {
    const { hasNotFound } = this.state;
    const { loading, recipe } = this.props;
    const hasDelayedRendering = recipe.id === this.recipeId;

    return (
      <RecipeEditor
        hasNotFound={hasNotFound}
        handleButtonClick={this.modifyButtonClicked}
        hasRender={hasDelayedRendering}
        submitButtonText="modify recipe"
        loading={loading}
      />
    );
  }
}

ModifyRecipe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  getRecipe: PropTypes.func.isRequired,
  modifyRecipe: PropTypes.func.isRequired,
  resetSuccessMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  statusCode: PropTypes.number.isRequired
};

ModifyRecipe.defaultProps = {
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

export { ModifyRecipe as PureModifyRecipe };
export default connect(mapStateToProps, {
  modifyRecipe,
  getRecipe,
  resetSuccessMessage: resetSuccess
})(ModifyRecipe);
