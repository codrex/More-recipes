import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm } from 'redux-form';
import IngredientListItem from './ingredientListItem';
import { validateIngredient } from '../../../../validator/validator';
import './addIngredient.scss';


const ReduxFormItem = (props) => {
  const NewIngredientListItem = reduxForm({
    validate: validateIngredient,
    form: `editIngredient_${props.i}`,
  })(IngredientListItem);
  return (
    <NewIngredientListItem
      ingredientName={props.ingredientName}
      delete={props.delete}
      editItem={props.editItem}
      index={props.i}
    />
  );
};
ReduxFormItem.propTypes = {
  ingredientName: PropTypes.string,
  delete: PropTypes.func,
  editItem: PropTypes.func,
  i: PropTypes.number,
};

const IngredientList = (props) => {
  const { ingredients, deleteItem, editItem } = props;
  return (
    <div className="ingredients-list">
      {ingredients.map((ingredient, i) =>
        (<ReduxFormItem
          key={i}
          ingredientName={ingredient}
          delete={deleteItem}
          editItem={editItem}
          i={i}
        />)
      )}
    </div>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.array,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
};

export default IngredientList;
