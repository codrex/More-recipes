import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../common/icon/icon';
import Button from '../../../common/button/button';
// import { Link } from 'react-router-dom';
import './recipeCard.scss';

const RecipeCard = (props) => {
  console.log(props.upVotes);
  return (
    <div className={"recipe-card col-xs-10 col-sm-10 col-md-5 col-lg-5"}>
      <div className="recipe-card-header">
        <h4 className="no-margin">{props.category}</h4>
      </div>
      <div className="recipe-card-body">
        <h2 className="recipe-name display-4 text-white " >
          {props.recipeName}
        </h2>
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
          {props.upVotes}
        </Icon>
        <Icon iconClass="fa fa-thumbs-down recipe-card-icon">{props.downVotes}</Icon>
        <Icon iconClass="fa fa-eye recipe-card-icon">{props.views}</Icon>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  upVotes: PropTypes.number,
  downVotes: PropTypes.number,
  views: PropTypes.number,
  recipeName: PropTypes.string,
  category: PropTypes.string,
};

export default RecipeCard;
