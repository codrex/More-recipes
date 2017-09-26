import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form from '../../../common/form/form';
import ItemsList from './itemsList';
import Input from '../../../common/form/input';
import Textarea from '../../../common/form/textarea';
import './addItems.scss';

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
      items: [],
    };
    this.addItem = this.addItem.bind(this);
    this.editItems = this.editItems.bind(this);
    this.deleteFromList = this.deleteFromList.bind(this);
  }

  /**
   *
   * @param {String} value
   * @return {undfined} undefined
   */
  addItem(value) {
    const { items } = this.state;
    this.setState(
      {
        items: items.concat(value[this.props.name])
      }
    );
    this.props.reset();
  }
  /**
   *
   * @param {number} index
   * @return {undfined} undefined
   */
  deleteFromList(index) {
    const { items } = this.state;
    items.splice(index, 1);
    this.setState({ items });
  }
  /**
   *
   * @param {string} value
   * @param {number} index
   * @return {undfined} undefined
   */
  editItems(value, index) {
    const { items } = this.state;
    items[index] = value;
    this.setState({ items });
  }


  /**
   * @return {function} AddItem jsx
   */
  render() {
    const { handleSubmit } = this.props;
    const Component = this.props.ingredients && Input || (this.props.directions && Textarea);
    return (
      <div className="col-xs-10 col-sm-6 col-md-8 col-lg-5 items ">
        <div className="items-header">
          <h4 className="lead items-header-text">{this.props.name} </h4>
          <Form
            onSubmit={handleSubmit(this.addItem)}
            submitBtnText="add to list"
          >
            <Field
              component={Component}
              name={this.props.name}
              type="text"
              id={this.props.name}
              placeholder={this.props.placeholder}
              fgClassName="d-flex flex-column-reverse"
            />
          </Form>
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

};

export default AddItems;
