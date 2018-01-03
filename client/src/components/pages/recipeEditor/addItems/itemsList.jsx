import PropTypes from 'prop-types';
import React from 'react';
import Item from './Item';
import { PureInput, PureTextarea } from '../../../common/FormElements';

const ItemsList = (props) => {
  const {
    items,
    deleteItem,
    editItem,
    ingredients,
    directions,
    name,
    uniquenessChecker
  } = props;
  return (
    <div>
      {items.map((item, index) =>
        (<Item
          key={`${item}${Date.now()}`}
          content={item}
          delete={deleteItem}
          editItem={editItem}
          Component={(ingredients && PureInput) || (directions && PureTextarea)}
          index={index}
          name={name}
          ingredients={ingredients}
          directions={directions}
          uniquenessChecker={uniquenessChecker}
        />)
      )}
    </div>
  );
};

ItemsList.defaultProps = {
  items: [],
  name: '',
  ingredients: false,
  directions: false
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape),
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  uniquenessChecker: PropTypes.func.isRequired,
  name: PropTypes.string,
  directions: PropTypes.bool,
  ingredients: PropTypes.bool,
};

export default ItemsList;
