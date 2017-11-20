import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Form from '../../../common/form/form';
import Button from '../../../common/button/button';
import Icon from '../../../common/icon/icon';
import { ListItem } from '../../../common/list/list';
import { item } from '../../../../utils/validator/validator';
import { Accordion, AccordionHeader,
       AccordionBody } from '../../../common/accordion/accordion';

const ListItemIcons = (props) => (
  <div className="d-flex">
    <Icon
      iconClass="fa fa-pencil"
      className="items-list-item-icon icon"
      handleClick={props.editIconClicked}
    />
    <Icon
      iconClass="fa fa-trash"
      className="items-list-item-icon icon"
      handleClick={props.deleteIconClicked}
    />
  </div>
);
ListItemIcons.propTypes = {
  editIconClicked: PropTypes.func,
  deleteIconClicked: PropTypes.func,
};

/**
 *  IngredientListItem component
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
    this.changeEditMode = this.changeEditMode.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.validateItem = this.validateItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveItemAfterEditing = this.saveItemAfterEditing.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps && this.state === nextState) {
      return false;
    }
    return true;
  }
  /**
   * @return {undefined}
   */
  changeEditMode() {
    this.setState({
      editMode: !this.state.editMode
    });
  }
  /**
   * @param {Object} value
   * @return {undefined}
   */
  updateValue(value) {
    this.props.editItem(value, this.props.index);
  }
  /**
   * @return {undefined}
   * @param {string} value
   */
  validateItem(value) {
    return item(value, this.props.name);
  }
  /**
   * @return {undefined}
   * @param {object} e
   */
  handleChange(e) {
    this.setState({
      itemValue: e.target.value
    });
  }
  /**
   * @return {undefined}
   * @param {object} e
   */
  saveItemAfterEditing() {
    const { itemValue } = this.state;
    if (itemValue === this.props.content) {
      this.changeEditMode();
      return;
    }
    const error = this.validateItem(itemValue);
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
   * @return {Object} Item
   */
  render() {
    const { Component, content } = this.props;
    return (
      <div className="d-flex flex-column ">
        {
          this.props.ingredients &&
            <ListItem className="items-list-item lead" content={content}>
              <ListItemIcons
                editIconClicked={this.changeEditMode}
                deleteIconClicked={() => this.props.delete(this.props.index)}
              />
            </ListItem>
        }
        {
          this.props.directions &&
            <Accordion
              index={this.props.index}
              id={this.props.name}
              className="flex-column items-list-item"
            >
              <AccordionHeader
                index={this.props.index}
                id={this.props.name}
                title={`Step ${this.props.index + 1}: ${content}`}
                className="d-flex no-margin justify-content-between w-100"
              >
                <ListItemIcons
                  editIconClicked={this.changeEditMode}
                  deleteIconClicked={() => this.props.delete(this.props.index)}
                />
              </AccordionHeader>
              <AccordionBody
                id={this.props.name}
                index={this.props.index}
              >
                <p>{content}</p>
              </AccordionBody>
            </Accordion>
        }
        {
          this.state.editMode &&
            <Form
              className={classnames('d-flex item-edit-form',
              this.props.directions && 'd-flex item-edit-form-textarea')}
            >
              <Component
                value={this.state.itemValue}
                className={classnames(' item-edit-input',
                  this.props.directions && 'item-edit-textarea')}
                fgClassName={classnames(' item-edit-fg',
                  this.props.directions && 'd-flex flex-column-reverse'
                )}
                handleChange={this.handleChange}
                error={this.state.ValidationErrors}
                id={this.props.name}
                name={this.props.name}
              />
              <div className="d-flex">
                <Button
                  className=" btn-secondary text-white item-edit-btn"
                  text="Save"
                  handleClick={this.saveItemAfterEditing}
                />
                <Button
                  className="btn-primary item-edit-btn"
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

Item.propTypes = {
  content: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  edit: PropTypes.func,
  delete: PropTypes.func,
  index: PropTypes.number,
  handleSubmit: PropTypes.func,
  editItem: PropTypes.func,
  input: PropTypes.object,
  Component: PropTypes.func,
  ingredients: PropTypes.bool,
  directions: PropTypes.bool,

};
export default Item;
