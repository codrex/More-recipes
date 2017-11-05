import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './recipeCard';

const RecipesGrid = (props) => {
  const { recipes } = props;
  return (
    <div className="col-12 grid">
      {recipes.length > 0 && !props.loading &&
        recipes.map((recipe) => (
          <RecipeCard
            recipeName={recipe.recipeName}
            category={recipe.category}
            views={recipe.views}
            upVotes={recipe.upVotes}
            downVotes={recipe.downVotes}
            recipeId={recipe.id}
            key={recipe.id}
          />
          )
        )
      }
      {recipes.length < 1 && !props.loading &&
        <div className="display-3 text-uppercase msg-display no-margin">
          <h1>Sorry..<br />No recipe was found.</h1>
        </div>
      }
    </div>
  );
};
RecipesGrid.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};
export default RecipesGrid;
