import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List } from '../../../common/list/list';
import Icon from '../../../common/icon/icon';
import './recipeList.scss';

const Recipes = (props) => {
  const recipes = props.recipes || [];
  return (
    <List
      style={{ padding: '2em 3em' }}
    >
      {recipes.map((item, i) =>
        (
        <ListItem
          key={i}
          content={item.recipeName}
          className="recipe-list-item"
          handleClick={() => props.handleClick(item)}
        >
          {props.type === 'createdRecipes' &&
            <div>
              <Icon
                iconClass="fa fa-pencil edit-icon"
                handleClick={() => props.onEditIconCliked(recipes[i])}
              />
              <Icon
                iconClass="fa fa-trash-o delete-icon"
                dataToggle="modal"
                dataTarget="#modal"
                handleClick={() => props.onDeleteIconClicked('Delete recipe', item.id)}
              />
            </div>
          }
          {props.type === 'favRecipes' &&
            <div>
              <Icon
                iconClass="fa fa-times delete-icon"
                handleClick={() => props.onFavIconClicked({ recipeId: item.id })}
              />
            </div>
          }
        </ ListItem>
        )
      )}
    </List>
  );
};

Recipes.propTypes = {
  recipes: PropTypes.array,
  onEditIconCliked: PropTypes.func,
  handleClick: PropTypes.func,
  onDeleteIconClicked: PropTypes.func,
  onFavIconClicked: PropTypes.func,
  type: PropTypes.string,
};

export default Recipes;
