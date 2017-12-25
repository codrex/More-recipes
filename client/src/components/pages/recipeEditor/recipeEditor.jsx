import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../common/loader';
import Button from '../../common/button';
import AddDirections from './addDirections';
import AddIngredients from './addIngredients';
import RecipeNameAndCategory from './recipeNameAndCategory';
import RecipeImage from './recipeImage';
import NotFound from '../../common/notFound';

/**
 * @name RecipeEditor
 * @return {React} jsx
 */
class RecipeEditor extends React.Component {
  renderNotFound = () => {
    const { hasNotFound } = this.props;
    if (hasNotFound) {
      return <NotFound message="Recipe not found" />;
    }
    return null;
  }

  renderBody = () => {
    const {
      loading,
      hasRender,
      submitButtonText,
      handleButtonClick,
      hasNotFound
    } = this.props;
    if (loading || hasNotFound) return null;
    return (
      <div>
        <div
          className="row d-flex justify-content-between align-items-start"
          style={{
            margin: '0.5em'
          }}
        >
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 name-category no-padding">
            {hasRender && <RecipeNameAndCategory />}
            <RecipeImage />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 d-flex ingredients no-padding">
            <AddIngredients />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 d-flex directions no-padding">
            <AddDirections />
          </div>
          <Button
            className="btn-secondary btn-lg w-100 text-uppercase add-recipe-btn"
            text={submitButtonText}
            handleClick={handleButtonClick}
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
    } = this.props;
    return (
      <div
        className="container main"
        style={{ maxWidth: 'unset' }}
      >
        {this.renderNotFound()}
        {this.renderBody()}
        {loading && <Loader loading={loading} />}
      </div>
    );
  }
}

RecipeEditor.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasRender: PropTypes.bool.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  hasNotFound: PropTypes.bool,
};

RecipeEditor.defaultProps = {
  message: PropTypes.string,
  statusCode: -1,
  hasNotFound: false
};


export default RecipeEditor;
