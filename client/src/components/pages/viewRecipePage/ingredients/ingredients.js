import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List } from '../../../common/list/list';


const Ingredients = (props) => {
  const ingredients = props.ingredients || [];
  return (
    <List>
      {ingredients.map((item, i) =>
        (<ListItem
          key={i}
          content={item}
          index={i}
        />)
      )}
    </List>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.array,
};

export default Ingredients;
