import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../recipeCard/recipeCard';
import './recipeGrid.scss';

const RecipesGrid = (props) => {
  const { recipes } = props;
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 grid">
      {recipes.length > 0 && !props.loading &&
        recipes.map((recipe) => (
          <RecipeCard
            recipeName={recipe.recipeName}
            category={recipe.category}
            views={recipe.views}
            upVotes={recipe.upVotes}
            downVotes={recipe.downVotes}
            recipeId={recipe.id}
          />
          )
        )
      }
      {recipes.length < 1 && !props.loading &&
        <h1 className="display-3 text-uppercase msg-display no-margin">
          Sorry..<br />No recipe was found.
        </h1>
      }
    </div>
  );
};
RecipesGrid.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};
export default RecipesGrid;
