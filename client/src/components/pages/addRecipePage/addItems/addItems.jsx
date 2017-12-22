import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form from '../../../common/form/form';
import ItemsList from './itemsList';
import Input from '../../../common/form/input';
import Textarea from '../../../common/form/textarea';
import Button from '../../../common/button/button';
import Icon from '../../../common/icon/icon';
import { item } from '../../../../utils/validator/validator';
import { RECIPE_ADDED } from '../../../../constants/constants';

/**
 * React component to add recipe Items
 */
class AddItems extends React.Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      items: props.items || [],
      showInput: true,
      validationError: props.externalError
    };
  }

  /**
   *
   * @param {Object} nextProps
   * @return {boolean} boolean value
   */
  componentWillReceiveProps = (nextProps) => {
    if (this.state.validationError !== nextProps.externalError) {
      this.setState({
        validationError: nextProps.externalError
      });
    }
    this.setState({
      items: nextProps.items
    });
  }

  /**
   * @param {object} nextProps
   * @return {boolean} boolean value
   */
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.message === RECIPE_ADDED) {
      return false;
    }
    return true;
  }

  /**
   *
   * @param {String} value
   * @return {undfined} undefined
   */
  addItem = (value) => {
    const { directions, ingredients } = this.props;
    const { items } = this.state;
    const itemsUpdate = (ingredients && [value[this.props.name]].concat(items)) ||
    (directions && items.concat(value[this.props.name]));
    this.props.sendItemsToStore(itemsUpdate);
    this.props.initialize();
  }

  /**
   *
   * @param {number} index
   * @return {undfined} undefined
   */
  deleteFromList = (index) => {
    const items = [].concat(this.state.items);
    items.splice(index, 1);
    this.props.sendItemsToStore(items);
  }
  /**
   *
   * @param {string} value
   * @param {number} index
   * @return {undfined} undefined
   */
  editItems = (value, index) => {
    const items = [].concat(this.state.items);
    items[index] = value;
    this.props.sendItemsToStore(items);
  }

  /**
   * @return {Array} array of strings
   * @param {string} value
   */
  validateItem = (value) => {
    const { name } = this.props;
    const lowerCaseValue = value && value.toLowerCase();
    if (this.state.items.includes(lowerCaseValue)) {
      return [`${name} is already on the list`];
    }
    return item(lowerCaseValue, name);
  }

  /**
   * @return {React} Form jsx
   */
  renderForm = () => {
    const {
      handleSubmit,
      name,
      placeholder,
      ingredients,
      directions,
      clearValidationError
    } = this.props;
    const Component = (ingredients && Input) || (directions && Textarea);
    if (this.state.showInput) {
      return (
        <Form
          onSubmit={handleSubmit(this.addItem)}
          submitBtnText={`add ${name}`}
          secondary
          lg={false}
        >
          <Field
            component={Component}
            name={name}
            type="text"
            id={name}
            placeholder={placeholder}
            fgClassName="d-flex flex-column no-margin"
            className="no-margin add-item-input"
            validate={this.validateItem}
            onFocus={() => clearValidationError({
              [`${name}s`]: ''
            })}
            externalError={{
              touched: true,
              error: this.state.validationError
            }}
          />
        </Form>
      );
    } return null;
  }

  /**
   * @return {React} List jsx
   */
  renderList = () => {
    const {
      name,
      Component,
      ingredients,
      directions
    } = this.props;
    return (
      <ItemsList
        items={this.state.items}
        deleteItem={this.deleteFromList}
        editItem={this.editItems}
        componentType={name}
        Component={Component}
        name={name}
        directions={directions}
        ingredients={ingredients}
      />
    );
  }

  /**
   * @return {React} AddItem jsx
   */
  render = () => {
    const { name } = this.props;
    const { items } = this.state;
    return (
      <div className="col-12 items ">
        <div className="items-header">
          <h4 className="items-header-text">
            {`${name}s ${' '}${items.length}`}
          </h4>
          {this.renderForm()}
        </div>
        <div className="col-12 items-list-wrapper">
          {this.renderList()}
        </div>
      </div>
    );
  }
}
AddItems.defaultProps = {
  ingredients: false,
  directions: false,
  externalError: [],
  Component: null
};

AddItems.propTypes = {
  clearValidationError: PropTypes.func.isRequired,
  directions: PropTypes.bool,
  externalError: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  handleSubmit: PropTypes.func.isRequired,
  ingredients: PropTypes.bool,
  initialize: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  sendItemsToStore: PropTypes.func.isRequired,
  Component: PropTypes.node,
};

export default AddItems;
