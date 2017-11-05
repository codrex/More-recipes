import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../common/icon/icon';
import Button from '../../common/button/button';
import { Link } from 'react-router-dom';

const pix = 'https://i.pinimg.com/564x/b5/be/08/b5be084a849fa67c190cc85b1e9216c3.jpg';

const RecipeCard = props => (
  <div className="recipe-card">
    <div className="recipe-card-body">
      <img src={pix} alt={`${props.recipeName}`} className="recipe-card-img" />
      <div className="recipe-card-underlay">
        <p className="lead">{props.category}</p>
        <h4 className="recipe-card-title">{props.recipeName}</h4>
        <Link to={`recipe/${props.recipeId}`}>
          <Button text="view details" className="recipe-card-underlay-btn" />
        </Link>
      </div>
    </div>
    <div className="recipe-card-footer">
      <Icon iconClass="fa fa-thumbs-up recipe-card-icon ">
        {props.upVotes}
      </Icon>
      <Icon iconClass="fa fa-thumbs-down recipe-card-icon ">
        {props.downVotes}
      </Icon>
      <Icon iconClass="fa fa-eye recipe-card-icon">{props.views}</Icon>
      <Icon iconClass="fa fa-heart-o recipe-card-icon fav-color" pointer />
    </div>
  </div>
  );

RecipeCard.propTypes = {
  upVotes: PropTypes.number,
  downVotes: PropTypes.number,
  views: PropTypes.number,
  recipeName: PropTypes.string,
  category: PropTypes.string,
  recipeId: PropTypes.number
};

export default RecipeCard;
