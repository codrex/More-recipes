import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import classnames from 'classnames';
import Icon from '../../common/Icon';
import Button from '../../common/Button';
import Animation from '../../common/Animation';
import { DEFAULT_RECIPE_PIX } from '../../../constants';


const RecipeCard = (props) => {
  const fav = props.isFav(props.recipeId);
  const {
    recipeName,
    category,
    recipeId,
    downVotes,
    upVotes,
    views,
    push,
    image
  } = props;
  return (
    <Animation>
      <div className="recipe-card">
        <div className="recipe-card-body">
          <Image
            cloudName="resycom"
            publicId={image.publicId || DEFAULT_RECIPE_PIX}
            width="400"
            height="250"
            crop="fill"
            className="recipe-card-img"
          />
          <div className="recipe-card-underlay">
            <p className="lead text-capitalize">{category}</p>
            <Button
              handleClick={() => {
                push(`/recipe/${recipeId}`);
              }}
              text="view details"
              className="recipe-card-underlay-btn"
            />
          </div>
        </div>
        <div className="recipe-card-footer">
          <h4 className="ellipsis">{recipeName}</h4>
          <div className="d-flex col-12 no-padding justify-content-between">
            <div className="d-flex col-8 no-padding">
              <Icon iconClass="fa fa-thumbs-up recipe-card-icon ">
                {upVotes}
              </Icon>
              <Icon iconClass="fa fa-thumbs-down recipe-card-icon ">
                {downVotes}
              </Icon>
              <Icon iconClass="fa fa-eye recipe-card-icon">{views}</Icon>
            </div>
            <Icon
              iconClass={classnames('fa recipe-card-icon fav-color fav',
                !fav && 'fa-heart-o', fav && 'fa-heart')}
              pointer
              handleClick={() => props.toggleFav(recipeId)}
            />
          </div>
        </div>
      </div>
    </Animation>
  );
};

RecipeCard.propTypes = {
  upVotes: PropTypes.number.isRequired,
  downVotes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipeId: PropTypes.number.isRequired,
  toggleFav: PropTypes.func.isRequired,
  isFav: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

RecipeCard.defaultProps = {
  image: {}
};

export default RecipeCard;
