import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './recipeCard';
import Loader from '../../common/loader/loader';

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
            />
          </li>
        )
        )
      }
      {recipes.length < 1 && !loading &&
        <div className="display-3 text-uppercase msg-display no-margin">
          <h1>Sorry..<br />No recipe was found.</h1>
        </div>
      }
      {
        loading &&
        <Loader loading={loading} />
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
