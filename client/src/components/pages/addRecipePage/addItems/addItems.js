import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form from '../../../common/form/form';
import ItemsList from './itemsList';
import Input from '../../../common/form/input';
import Textarea from '../../../common/form/textarea';
import Icon from '../../../common/icon/icon';
import './addItems.scss';

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
      items: [],
      addItem: false,
    };
    this.addItem = this.addItem.bind(this);
    this.editItems = this.editItems.bind(this);
    this.deleteFromList = this.deleteFromList.bind(this);
    this.newItem = this.newItem.bind(this);
  }
  /**
   *
   * @param {object} nextState
   * @return {undefined}
   */
  // shouldComponentRender(nextState) {
  //   console.log(nextState, 'componentsup');
  //   return true;
  // }
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
    const { items } = this.state;
    const itemsUpdate = items.concat(value[this.props.name]);
    this.setState(
      {
        items: itemsUpdate
      }
    );
    this.props.reset();
    this.props.sendItemsToStore(itemsUpdate);
  }
  /**
   *
   * @param {number} index
   * @return {undfined} undefined
   */
  deleteFromList(index) {
    const items = [].concat(this.state.items);
    items.splice(index, 1);
    this.setState({ items });
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
    this.setState({ items });
    this.props.sendItemsToStore(items);
  }


  /**
   * @return {function} AddItem jsx
   */
  render() {
    console.log('rendering add item', this.props.name);
    const { handleSubmit } = this.props;
    const Component = this.props.ingredients && Input || (this.props.directions && Textarea);
    return (
      <div className="col-12 items ">
        <div className="items-header">
          <h4 className="lead items-header-text">
            {this.props.name}
            <Icon
              iconClass="fa fa-plus"
              className="float-right"
              handleClick={this.newItem}
            />
          </h4>

         {this.state.addItem &&
           <Form
             onSubmit={handleSubmit(this.addItem)}
             submitBtnText="add to list"
             secondary
           >
             <Field
               component={Component}
               name={this.props.name}
               type="text"
               id={this.props.name}
               placeholder={this.props.placeholder}
               fgClassName="d-flex flex-column-reverse no-margin"
               className="no-margin"
             />
           </Form>
        }

        </div>
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
