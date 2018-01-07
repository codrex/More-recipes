import React from 'react';
import PropTypes from 'prop-types';
import List from '../../common/List';
import ListItem from '../../common/ListItem';
import Icon from '../../common/Icon';


/**
 * RecipeList component
 * @param {object} props
 * @return {React} react element
 */
const RecipeList = (props) => {
  const recipes = props.recipes || [];
  const {
    onDeleteIconClicked,
    onEditIconCliked,
    handleClick
  } = props;
  return (
    <List
      className="recipe-list"
    >
      {recipes.length > 0 &&
        <h4 className="display-4 bold header">
          my recipes
        </h4>
      }
      {
        recipes.map((item, i) =>
          (
            <ListItem
              key={item.id}
              index={i}
              content={item.name}
              className="recipe-list-item"
              handleClick={() => handleClick(item)}
            >
              <div>
                <Icon
                  iconClass="fa fa-pencil edit-icon"
                  pointer
                  handleClick={() => onEditIconCliked(recipes[i].id)}
                />
                <Icon
                  iconClass="fa fa-trash-o delete-icon"
                  dataToggle="modal"
                  dataTarget="#modal"
                  pointer
                  handleClick={() => onDeleteIconClicked('Delete recipe', item.id, i)}
                />
              </div>
            </ListItem>
          )
        )}
    </List>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onEditIconCliked: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  onDeleteIconClicked: PropTypes.func.isRequired,
};

export default RecipeList;
