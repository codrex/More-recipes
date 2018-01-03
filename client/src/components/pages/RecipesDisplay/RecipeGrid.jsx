import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import imageParser from '../../../utils/imageParser';
import Loader from '../../common/Loader';

const RecipeGrid = (props) => {
  const { recipes, loading } = props;
  if (loading) return <Loader loading={loading} />;
  if (recipes.length < 1) return null;

  return (
    <ul className="grid">
      {
        recipes.map(
          recipe => (
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

RecipeGrid.defaultProps = {
  loading: false,
  isUserFav: false
};

RecipeGrid.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool,
  toggleFav: PropTypes.func.isRequired,
  isUserFav: PropTypes.func,
};

export default RecipeGrid;
