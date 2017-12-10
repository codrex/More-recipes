import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List } from '../../../common/list/list';


const Ingredients = (props) => {
  const ingredients = props.ingredients || [];
  return (
    <List>
      {ingredients.map((content, i) =>
        (<ListItem
          key={content + Date.now()}
          content={content}
          index={i}
        />)
      )}
    </List>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Ingredients;
