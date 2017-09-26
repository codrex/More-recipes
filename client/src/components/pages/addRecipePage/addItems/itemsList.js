import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm } from 'redux-form';
import ListItem from './listItem';
import { validateItems } from '../../../../validator/validator';
import './addItems.scss';


const ReduxFormItem = (props) => {
  const { name } = props;
  const NewListItem = reduxForm({
    validate: validateItems,
    form: `${props.name}_${props.i}`,
    initialValues: { [name]: props.content },
  })(ListItem);
  return (
    <NewListItem
      content={props.content}
      delete={props.delete}
      editItem={props.editItem}
      index={props.i}
      Component={props.Component}
      name={name}
      ingredients={props.ingredients}
      directions={props.directions}
    />
  );
};
ReduxFormItem.propTypes = {
  content: PropTypes.string,
  delete: PropTypes.func,
  editItem: PropTypes.func,
  name: PropTypes.string,
  Component: PropTypes.func,
  i: PropTypes.number,
  directions: PropTypes.bool,
  ingredients: PropTypes.bool,
};

const List = (props) => {
  const { items, deleteItem, editItem, Component } = props;
  return (
    <div className="items-list">
      {items.map((item, i) =>
        (<ReduxFormItem
          key={i}
          content={item}
          delete={deleteItem}
          editItem={editItem}
          Component={Component}
          i={i}
          name={props.name}
          ingredients={props.ingredients}
          directions={props.directions}
        />)
      )}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  Component: PropTypes.func,
  name: PropTypes.string,
  directions: PropTypes.bool,
  ingredients: PropTypes.bool,
};

export default List;
