import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form from '../../../common/form/form';
import ItemsList from './itemsList';
import Input from '../../../common/form/input';
import Textarea from '../../../common/form/textarea';
import Icon from '../../../common/icon/icon';
import { item } from '../../../../utils/validator/validator';

/**
 * React component to add recipe Items
 */
class AddItems extends React.PureComponent {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      items: props.items || [],
      addItem: false,
    };
    this.addItem = this.addItem.bind(this);
    this.editItems = this.editItems.bind(this);
    this.deleteFromList = this.deleteFromList.bind(this);
    this.newItem = this.newItem.bind(this);
    this.validateItem = this.validateItem.bind(this);
  }
  /**
   *
   * @param {Object} nextProps
   * @return {bool} true and false
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
    return true;
  }
  /**
   *
   * @param {object} nextState
   * @return {undefined}
   */
  /**
   *
   * @return {undfined} undefined
   */
  newItem() {
    this.setState({ addItem: !this.state.addItem, });
  }

  /**
   *
   * @param {String} value
   * @return {undfined} undefined
   */
  addItem(value) {
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
  deleteFromList(index) {
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
  editItems(value, index) {
    const items = [].concat(this.state.items);
    items[index] = value;
    this.props.sendItemsToStore(items);
  }

  /**
   * @return {undefined}
   * @param {string} value
   */
  validateItem(value) {
    return item(value, this.props.name);
  }


  /**
   * @return {function} AddItem jsx
   */
  render() {
    const { handleSubmit } = this.props;
    const Component = this.props.ingredients && Input || (this.props.directions && Textarea);
    return (
      <div className="col-xs-12 col-sm-12 col-11 items ">
        <div className="items-header">
          <h4 className="lead items-header-text">
            {`${this.props.name}s ${' '}${this.state.items.length}`}
            <Icon
              iconClass={!this.state.addItem && 'fa fa-plus' ||
              this.state.addItem && 'fa fa-remove'}
              className="float-right"
              handleClick={this.newItem}
            />
          </h4>

         {this.state.addItem &&
           <Form
             onSubmit={handleSubmit(this.addItem)}
             submitBtnText="add to list"
             primaryInverse
             lg={false}
           >
             <Field
               component={Component}
               name={this.props.name}
               type="text"
               id={this.props.name}
               placeholder={this.props.placeholder}
               fgClassName="d-flex flex-column-reverse"
               className="no-margin add-item-input"
               validate={this.validateItem}
             />
           </Form>
        }

        </div>
        <div className="col-12 items-list-wrapper">
          {<ItemsList
            items={this.state.items}
            deleteItem={this.deleteFromList}
            editItem={this.editItems}
            componentType={this.props.name}
            Component={Component}
            name={this.props.name}
            directions={this.props.directions}
            ingredients={this.props.ingredients}
          />}
        </div>
      </div>
    );
  }
}

AddItems.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.bool,
  directions: PropTypes.bool,
  updateParentState: PropTypes.func

};

export default AddItems;
