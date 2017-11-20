import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './recipeCard';

const RecipesGrid = (props) => {
  const { recipes } = props;
  if (recipes.length < 1) return <div />;
  return (
    <ul className="grid">
      {recipes.length > 0 && !props.loading &&
        recipes.map((recipe) => (
          <li className="card-wrapper" key={recipe.id}>
            <RecipeCard
              recipeName={recipe.recipeName}
              category={recipe.category}
              views={recipe.views}
              upVotes={recipe.upVotes}
              downVotes={recipe.downVotes}
              recipeId={recipe.id}
              toggleFav={props.toggleFav}
              isFav={props.isUserFav}
            />
          </li>
          )
        )
      }
      {recipes.length < 1 && !props.loading &&
        <div className="display-3 text-uppercase msg-display no-margin">
          <h1>Sorry..<br />No recipe was found.</h1>
        </div>
      }
    </ul>
  );
};

RecipesGrid.defaultProps = {
  loading: false,
};

RecipesGrid.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  toggleFav: PropTypes.func.isRequired,
  isUserFav: PropTypes.func,
};
export default RecipesGrid;
