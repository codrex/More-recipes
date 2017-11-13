import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../../common/icon/icon';
import Button from '../../common/button/button';
import { Link } from 'react-router-dom';

const pix = 'https://i.pinimg.com/564x/b5/be/08/b5be084a849fa67c190cc85b1e9216c3.jpg';

const RecipeCard = (props) => {
  const fav = props.isFav(props.recipeId);
  return (
    <div className="recipe-card">
      <div className="recipe-card-body">
        <img src={pix} alt={`${props.recipeName}`} className="recipe-card-img" />
        <div className="recipe-card-underlay">
          <p className="lead text-capitalize">{props.category}</p>
          <Link to={`recipe/${props.recipeId}`} >
            <Button
              text="view details"
              className="recipe-card-underlay-btn"
            />
          </Link>
        </div>
      </div>
      <div className="recipe-card-footer">
        <h4>{props.recipeName}</h4>
        <div className="d-flex col-12 no-padding justify-content-between">
          <div className="d-flex col-8 no-padding">
            <Icon iconClass="fa fa-thumbs-up recipe-card-icon ">
              {props.upVotes}
            </Icon>
            <Icon iconClass="fa fa-thumbs-down recipe-card-icon ">
              {props.downVotes}
            </Icon>
            <Icon iconClass="fa fa-eye recipe-card-icon">{props.views}</Icon>
          </div>
          <Icon
            iconClass={classnames('fa recipe-card-icon fav-color fav',
            !fav && 'fa-heart-o', fav && 'fa-heart')}
            pointer handleClick={() => props.toggleFav(props.recipeId)}
          />
        </div>
      </div>
    </div>
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
  isFav: PropTypes.func.isRequired
};

export default RecipeCard;
