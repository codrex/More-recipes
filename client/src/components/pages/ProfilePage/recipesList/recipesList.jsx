import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List } from '../../../common/list/list';
import Icon from '../../../common/icon/icon';

const Recipes = (props) => {
  const recipes = props.recipes || [];
  return (
    <List
      className="recipe-list"
    >
      {recipes.length > 0 &&
        <h4 className="display-4 bold header">
          {props.type === 'favRecipes' && 'my favorite recipes'}
          {props.type !== 'favRecipes' && 'my recipes'}
        </h4>
      }
      {!recipes.length &&
        <div className="display-3 text-uppercase msg-display">
          <h1>Sorry..<br />No recipe was found.</h1>
        </div>
      }

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
                pointer
                handleClick={() => props.onEditIconCliked(recipes[i].id)}
              />
              <Icon
                iconClass="fa fa-trash-o delete-icon"
                dataToggle="modal"
                dataTarget="#modal"
                pointer
                handleClick={() => props.onDeleteIconClicked('Delete recipe', item.id, i)}
              />
            </div>
          }
          {props.type === 'favRecipes' &&
            <div>
              <Icon
                iconClass="fa fa-heart fav-icon"
                pointer
                handleClick={() => props.onFavIconClicked(item.id)}
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
