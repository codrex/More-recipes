import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List } from '../../../common/list/list';
import Icon from '../../../common/icon/icon';
import './recipeList.scss';

const Recipes = (props) => {
  console.log(props.recipes)
  const recipes = props.recipes || [];
  return (
    <List style={{ padding: '2em' }}>
      {recipes.map((item, i) =>
        (
        <ListItem
          key={i}
          content={item.recipeName}
          className="recipe-list-item"
        >
          <div>
            <Icon
              iconClass="fa fa-pencil"
            />
            <Icon
              iconClass="fa fa-trash"
            />
          </div>
        </ ListItem>
        )
      )}
    </List>
  );
};

Recipes.propTypes = {
  recipes: PropTypes.array,
};

export default Recipes;
