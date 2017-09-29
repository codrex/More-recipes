import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../recipeCard/recipeCard';
import './recipeGrid.scss';

const RecipesGrid = (props) => {
  const { recipes } = props;
  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 grid">
      {recipes.length > 0 &&
        recipes.map((recipe) => (
          <RecipeCard
            recipeName={recipe.recipeName}
            category={recipe.category}
            views={recipe.views}
            upvotes={recipe.upvotes}
            downvotes={recipe.downvotes}
          />
          )
        )
      }
      {recipes.length < 1 &&
        <h1 className="display-3 text-uppercase msg-display">nothing to display</h1>
      }
    </div>
  );
};
RecipesGrid.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object)
};
export default RecipesGrid;
