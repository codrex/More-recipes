import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';
import Form from '../../../common/form/form';
import Input from '../../../common/form/input';
import Button from '../../../common/button/button';
import './addIngredient.scss';

/**
 *  IngredientListItem component
 */
class IngredientListItem extends React.Component {

/**
 *
 * @param {Object} props
 */
  constructor(props) {
    super(props);
    this.state = { editMode: false };
    this.changeEditMode = this.changeEditMode.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  /**
   * @return {undefined}
   */
  changeEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }
  /**
   * @param {Object} value
   * @return {undefined}
   */
  updateValue(value) {
    this.props.editItem(value.ingredient, this.props.index);
  }

  /**
   * @return {Object} IngredientListItem
   */
  render() {
    const { handleSubmit, editItem } = this.props;
    return (
      <div className="d-flex flex-column ">
        <h4 className="ingredients-list-item ">
          {this.props.ingredientName}
          <div className="d-flex">
            <div className="icon-wrapper" >
              <i
                className="fa fa-pencil text-white ingredients-list-item-icon icon"
                onClick={this.changeEditMode}
              ></i>
            </div>
            <div className="icon-wrapper">
              <i
                className="fa fa-trash text-white ingredients-list-item-icon icon"
                onClick={() => this.props.delete(this.props.index)}
              ></i>
            </div>
          </div>
        </h4>
        {this.state.editMode &&
          <Form
            onSubmit={handleSubmit(value => editItem(value.ingredient, this.props.index))}
            className="d-flex ingredient-edit-form"
          >
            <Field
              component={Input}
              name="ingredient"
              type="text"
              id="ingredient"
              placeholder="Enter an ingredient name"
              className=" ingredient-edit-input"
              fgClassName="ingredient-edit-fg"
              value={this.props.ingredientName}
            />
            <div className="d-flex">
              <Button
                className=" btn-secondary text-white ingredient-edit-btn"
                text="Save"
                type="submit"
              />
              <Button
                className="btn-primary ingredient-edit-btn"
                handleClick={this.changeEditMode}
                text="close"
              />
            </div>
          </Form>
        }
      </div>
    );
  }
}

IngredientListItem.propTypes = {
  ingredientName: PropTypes.string,
  edit: PropTypes.func,
  delete: PropTypes.func,
  index: PropTypes.number,
  handleSubmit: PropTypes.func,
  editItem: PropTypes.func,
  input: PropTypes.object,
};
export default IngredientListItem;
