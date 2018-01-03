import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { Form } from '../../../common/FormElements';
import Button from '../../../common/Button';
import Icon from '../../../common/Icon';
import ListItem from '../../../common/ListItem';
import { validateItem } from '../../../../utils/validator';
import {
  Accordion,
  AccordionHeader,
  AccordionBody
} from '../../../common/Accordion';

const ListItemIcons = props => (
  <div className="d-flex align-items-center">
    <Icon
      id="editIcon"
      iconClass="fa fa-pencil"
      className="items-list-item-icon icon"
      handleClick={props.editIconClicked}
    />
    <Icon
      id="deleteIcon"
      iconClass="fa fa-trash"
      className="items-list-item-icon icon"
      handleClick={props.deleteIconClicked}
    />
  </div>
);
ListItemIcons.propTypes = {
  deleteIconClicked: PropTypes.func,
  editIconClicked: PropTypes.func,
};
ListItemIcons.defaultProps = {
  deleteIconClicked: () => {},
  editIconClicked: () => {},
};

/**
 *  Item component
 */
class Item extends React.Component {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      itemValue: props.content,
      ValidationErrors: []
    };
  }

  /**
   * @return {undefined}
   */
  changeEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  /**
   * @param {Object} value
   * @return {undefined}
   */
  updateValue = (value) => {
    this.props.editItem(value, this.props.index);
  }

  /**
   * @return {undefined}
   * @param {string} value
   */
  validateItem = value => validateItem(value, this.props.name)

  /**
   * @return {undefined}
   * @param {object} event
   */
  handleChange = (event) => {
    this.setState({
      itemValue: event.target.value
    });
  }

  /**
   * @return {undefined}
   */
  saveItemAfterEditing = () => {
    const { itemValue } = this.state;
    if (itemValue === this.props.content) {
      this.changeEditMode();
      return;
    }
    const error = this.validateItem(itemValue) || this.props.uniquenessChecker(itemValue);
    if (error) {
      this.setState({
        ValidationErrors: error,
        itemValue: this.props.content
      });
      return;
    }
    this.updateValue(itemValue);
    this.changeEditMode();
  }

  /**
   * @return {React} Ingredients List
   */
  renderIngredient = () => {
    const { content, ingredients } = this.props;
    if (ingredients) {
      return (
        <ListItem className="items-list-item" content={content} >
          <ListItemIcons
            editIconClicked={this.changeEditMode}
            deleteIconClicked={() => this.props.delete(this.props.index)}
          />
        </ListItem>
      );
    } return null;
  }

  /**
   * @return {React} Directions List
   */
  renderDirection = () => {
    const { content, directions, index, name } = this.props;
    if (directions) {
      return (
        <Accordion
          index={index}
          id={name}
          className="flex-column items-list-item"
        >
          <AccordionHeader
            index={index}
            id={name}
            title={`Step ${index + 1}: ${content}`}
            className="d-flex justify-content-between w-100"
          >
            <ListItemIcons
              editIconClicked={this.changeEditMode}
              deleteIconClicked={() => this.props.delete(index)}
            />
          </AccordionHeader>
          <AccordionBody
            id={name}
            index={index}
          >
            <p>{content}</p>
          </AccordionBody>
        </Accordion>
      );
    } return null;
  }

  /**
   * @return {React} Editing form
   */
  renderEditForm = () => {
    const { directions, name, Component } = this.props;
    const { editMode, ValidationErrors } = this.state;
    if (editMode) {
      return (
        <Form
          className={classnames('d-flex item-edit-form',
            directions && 'd-flex item-edit-form-textarea')}
        >
          <Component
            value={this.state.itemValue}
            className={classnames(' item-edit-input', directions && 'item-edit-textarea')}
            fgClassName={classnames(' item-edit-fg', directions && 'd-flex flex-column-reverse')}
            handleChange={this.handleChange}
            error={ValidationErrors}
            id={name}
            name={name}
          />
          <div className="d-flex">
            <Button
              id="saveBtn"
              className=" btn-secondary text-white item-edit-btn"
              text="Save"
              handleClick={this.saveItemAfterEditing}
            />
            <Button
              id="closeBtn"
              className="btn-primary item-edit-btn"
              handleClick={this.changeEditMode}
              text="close"
            />
          </div>
        </Form>
      );
    } return null;
  }

  /**
   * @return {React} Item
   */
  render() {
    return (
      <div className="d-flex flex-column ">
        {this.renderIngredient()}
        {this.renderDirection()}
        {this.renderEditForm()}
      </div>
    );
  }
}

Item.defaultProps = {
  ingredients: false,
  directions: false,
};

Item.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  editItem: PropTypes.func.isRequired,
  Component: PropTypes.func.isRequired,
  ingredients: PropTypes.bool,
  directions: PropTypes.bool,
  delete: PropTypes.func.isRequired,
  uniquenessChecker: PropTypes.func.isRequired,
};

export default Item;
