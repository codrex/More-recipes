import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

/**
 * SearchBox component
 * @return {React} react element
 */
class SearchBox extends React.Component {
  /**
   * constructor
   * @param {Object} props
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialSearchTerm,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * @return {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { initialSearchTerm } = nextProps;
    if (this.state.value !== initialSearchTerm) {
      this.setState({ value: initialSearchTerm });
    }
  }
  /**
   * handles value change event
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
   * handel submit event
   * @return {undefined}
   * @param {Object} event
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.handleSubmit) this.props.handleSubmit(this.state.value);
  }

  /**
   * render
   * @return {React} react element
   */
  render() {
    return (
      <form className="searchbox" onSubmit={this.handleSubmit} id="searchbox">
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
  initialSearchTerm: ''
};

SearchBox.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  initialSearchTerm: PropTypes.string
};

export default SearchBox;
