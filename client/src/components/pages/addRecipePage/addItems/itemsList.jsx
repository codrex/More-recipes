import PropTypes from 'prop-types';
import React from 'react';
import ListItem from './item';
import PureInput from '../../../common/form/pure-input';
import PureTextarea from '../../../common/form/pure-textarea';


const List = (props) => {
  const { items, deleteItem, editItem, ingredients, directions } = props;
  return (
    <div>
      {items.map((item, index) =>
        (<ListItem
          key={index}
          content={item}
          delete={deleteItem}
          editItem={editItem}
          Component={(ingredients && PureInput) || (directions && PureTextarea)}
          index={index}
          name={props.name}
          ingredients={ingredients}
          directions={directions}
        />)
      )}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  name: PropTypes.string,
  directions: PropTypes.bool,
  ingredients: PropTypes.bool,
};

export default List;
