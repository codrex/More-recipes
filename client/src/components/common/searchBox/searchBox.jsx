import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';

/**
 * @name SearchBox
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
 * @return {undefined}
 * @param {Object} event
 */
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    if (this.props.handleChange) this.props.handleChange(event.target.value);
  }

  /**
 * @return {undefined}
 * @param {Object} event
 */
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.handleSubmit) this.props.handleSubmit(this.state.value);
  }
  /**
   * @return{undefined}
   */
  render() {
    return (
      <form className="searchbox" onSubmit={this.handleSubmit}>
        <input
          type="search"
          className="form-control text-input"
          placeholder="Search"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <Icon iconClass="fa fa-search" />
      </form>
    );
  }
}

SearchBox.defaultProps = {
  handleChange: () => {},
  handleSubmit: () => {},
};

SearchBox.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default SearchBox;
