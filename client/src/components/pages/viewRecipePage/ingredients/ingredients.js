import React from 'react';
import PropTypes from 'prop-types';
import './ingredients.scss';

const Ingredient = (props) => (
  <h4 className="items-list-item lead ingredient" data-index={props.index + 1}>
    {props.content}
  </h4>
);

Ingredient.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number
};

const Ingredients = (props) => {
  const ingredients = props.ingredients || [];
  return (
    <div className="col-12">
      {ingredients.map((item, i) =>
        (<Ingredient
          key={i}
          content={item}
          index={i}
        />)
      )}
    </div>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.array,
};

export default Ingredients;
