import React from 'react';
import Input from '../form/input';
import Icon from '../icon/icon';
import './searchbox.scss';

/**
 * SearchBox component
 */
class SearchBox extends React.Component {
  /**
   * @param {Object} props
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
/**
 * @return {undefined}
 * @param {Object} e
 */
  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.handleSubmit(e.target.value);
  }
  /**
   * @return{undefined}
   */
  render() {
    return (
      <div className="searchbox">
        <input
          type="search"
          className="form-control text-input'"
          placeholder="Search"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <Icon iconClass="fa fa-search" />
      </div>
    );
  }
}

export default SearchBox;
