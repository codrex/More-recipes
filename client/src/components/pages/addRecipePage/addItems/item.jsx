import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';
import Form from '../../../common/form/form';
import Button from '../../../common/button/button';
import Icon from '../../../common/icon/icon';
import { ListItem } from '../../../common/list/list';
import { Accordion, AccordionHeader,
       AccordionBody } from '../../../common/accordion/accordion';

import './addItems.scss';

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
    this.props.editItem(value[this.props.name], this.props.index);
  }

  /**
   * @return {Object} Item
   */
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="d-flex flex-column ">
        {
          this.props.ingredients &&
            <ListItem className="items-list-item lead" content={this.props.content}>
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
              className="flex-column"
            >
              <AccordionHeader
                index={this.props.index}
                id={this.props.name}
                title={`Direction ${this.props.index + 1}`}
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
                <p>{this.props.content}</p>
              </AccordionBody>
            </Accordion>
        }
        {
          this.state.editMode &&
            <Form
              onSubmit={handleSubmit(value => this.updateValue(value, this.props.index))}
              className={classnames('d-flex item-edit-form',
              this.props.directions && 'd-flex item-edit-form-textarea')}
            >
              <Field
                component={this.props.Component}
                name={this.props.name}
                type="text"
                id={this.props.name}
                placeholder={this.props.placeholder}
                className={classnames(' item-edit-input',
                  this.props.directions && 'item-edit-textarea')}
                fgClassName={classnames(' item-edit-fg',
                this.props.directions && 'd-flex flex-column-reverse')}
              />
              <div className="d-flex">
                <Button
                  className=" btn-secondary text-white item-edit-btn"
                  text="Save"
                  type="submit"
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
