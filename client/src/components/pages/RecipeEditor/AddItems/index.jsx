import React from 'react';
import PropTypes from 'prop-types';
import ItemsList from './ItemsList';
import { Input, Textarea, Form } from '../../../common/FormElements';
import { validateItem } from '../../../../utils/validator';
import ItemField from './ItemField';
import { RECIPE_ADDED } from '../../../../constants';

/**
 * React component to add recipe Items
 */
class AddItems extends React.Component {
  /**
   * constructor
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
   * add item to list
   * @param {String} value
   * @return {undefined} undefined
   */
  addItem = (value) => {
    const { directions, ingredients } = this.props;
    const { items } = this.state;
    const item = value[this.props.name].toLowerCase();

    const itemsUpdate = (ingredients && [item].concat(items)) ||
    (directions && items.concat(item));

    this.props.sendItemsToStore(itemsUpdate);
    this.props.initialize();
  }

  /**
   * remove item from list
   * @param {number} index
   * @return {undefined} undefined
   */
  deleteFromList = (index) => {
    const items = [].concat(this.state.items);
    items.splice(index, 1);
    this.props.sendItemsToStore(items);
  }

  /**
   * edit item
   * @param {string} value
   * @param {number} index
   * @return {undefined} undefined
   */
  editItems = (value, index) => {
    const items = [].concat(this.state.items);
    items[index] = value;
    this.props.sendItemsToStore(items);
  }

  /**
   * validate item
   * @return {Array} array of strings
   * @param {string} value
   */
  validate = (value) => {
    const { name } = this.props;
    const lowerCaseValue = value && value.toLowerCase();
    if (this.state.items.includes(lowerCaseValue)) {
      return [`${name} is already on the list`];
    }
    return validateItem(lowerCaseValue, name);
  }

  /**
   * render form
   * @return {React} react component
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
          id={`${name}-submit-btn`}
        >
          <ItemField
            Component={Component}
            name={name}
            placeholder={placeholder}
            validate={this.validate}
            clearValidationError={clearValidationError}
            validationError={this.state.validationError}
          />
        </Form>
      );
    } return null;
  }

  /**
   * render list
   * @return {React} react component
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
        uniquenessChecker={this.validate}
      />
    );
  }

  /**
   * render
   * @return {React} react component
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
  externalError: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.array, PropTypes.bool
    ]
  ),
  handleSubmit: PropTypes.func.isRequired,
  ingredients: PropTypes.bool,
  initialize: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  sendItemsToStore: PropTypes.func.isRequired,
  Component: PropTypes.oneOfType(
    [
      PropTypes.node,
      PropTypes.element,
      PropTypes.func
    ]
  )
};

export default AddItems;
