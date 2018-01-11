import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import classnames from 'classnames';
import Icon from '../../common/Icon';
import Button from '../../common/Button';
import Animation from '../../common/Animation';
import { DEFAULT_RECIPE_PIX } from '../../../constants';

/**
 * RecipeCard component
 * @param {object} props
 * @return {React} react element
 */
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
    image,
    index
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
              id={`view-details-btn-${index}`}
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
              <Icon
                toolTip
                toolTipId={`${recipeId}upvote`}
                tip={`Total Upvotes: ${upVotes}`}
                iconClass="fa fa-thumbs-up recipe-card-icon "
              >
                {upVotes}
              </Icon>
              <Icon
                toolTip
                toolTipId={`${recipeId}downvote`}
                tip={`Total Downvotes: ${downVotes}`}
                iconClass="fa fa-thumbs-down recipe-card-icon "
              >
                {downVotes}
              </Icon>
              <Icon
                toolTip
                toolTipId={`${recipeId}views`}
                tip={`Total Number of Views: ${views}`}
                iconClass="fa fa-eye recipe-card-icon"
              >
                {views}
              </Icon>
            </div>
            <Icon
              toolTip
              toolTipId={`${recipeId}fav`}
              tip={`${fav ? 'Unfavourite This Recipe' : 'Favourite This Recipe'}`}
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
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  index: PropTypes.number.isRequired
};

RecipeCard.defaultProps = {
  image: {},
  index: -1,
};

export default RecipeCard;
