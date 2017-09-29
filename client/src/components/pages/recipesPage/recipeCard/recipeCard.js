import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../common/icon/icon';
import Button from '../../../common/button/button';
// import { Link } from 'react-router-dom';
import './recipeCard.scss';

const RecipeCard = (props) => {
  return (
    <div className="recipe-card">
      <div className="recipe-card-header">
        <h4>{props.category}</h4>
      </div>
      <div className="recipe-card-body">
        <a href="./recipe.html">
          <h2 className="recipe-name display-4 text-white " >
            {props.recipeName}
          </h2>
        </a>
        <div className="recipe-card-underlay">
          <Icon
            iconClass="fa fa-heart"
            className="recipe-card-underlay-heart"
            tab="1"
          />
          <Button text="view details" className="recipe-card-underlay-btn" />
        </div>
      </div>

      <div className="recipe-card-footer">
        <Icon iconClass="fa fa-thumbs-up recipe-card-icon" >
          {props.upvotes}
        </Icon>
        <Icon iconClass="fa fa-thumbs-down recipe-card-icon">{props.downvotes}</Icon>
        <Icon iconClass="fa fa-eye recipe-card-icon">{props.views}</Icon>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  views: PropTypes.number,
  recipeName: PropTypes.string,
  category: PropTypes.string,
};

export default RecipeCard;
