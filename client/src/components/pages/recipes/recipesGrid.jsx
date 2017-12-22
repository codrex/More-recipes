import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './recipeCard';
import imageParser from '../../../utils/imageParser/imageParser';

const RecipesGrid = (props) => {
  const { recipes, loading } = props;
  if (recipes.length < 1) return <div />;
  return (
    <ul className="grid">
      {recipes.length > 0 && !loading &&
        recipes.map(recipe => (
          <li className="card-wrapper" key={recipe.id}>
            <RecipeCard
              recipeName={recipe.name}
              category={recipe.category}
              views={recipe.views}
              upVotes={recipe.upVotes}
              downVotes={recipe.downVotes}
              recipeId={recipe.id}
              toggleFav={props.toggleFav}
              isFav={props.isUserFav}
              push={props.history.push}
              image={imageParser(recipe.image)}
            />
          </li>
        )
        )
      }
    </ul>
  );
};

RecipesGrid.defaultProps = {
  loading: false,
  isUserFav: false
};

RecipesGrid.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool,
  toggleFav: PropTypes.func.isRequired,
  isUserFav: PropTypes.func,
};
export default RecipesGrid;
