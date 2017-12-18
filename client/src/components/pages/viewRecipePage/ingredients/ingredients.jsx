import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List } from '../../../common/list/list';


const Ingredients = (props) => {
  const ingredients = props.ingredients || [];
  return (
    <List className="ingredient-list-wrapper">
      <h5 className="display-4 w-100">Ingredients </h5>
      {ingredients.map((content, i) =>
        (<ListItem
          key={content + Date.now()}
          content={content}
          index={i}
          className="col-xs-12 col-sm-6 col-md-6 col-lg-6 no-box-shadow"
        />)
      )}
    </List>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Ingredients;
