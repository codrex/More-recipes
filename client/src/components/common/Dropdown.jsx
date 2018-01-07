import React from 'react';
import PropTypes from 'prop-types';
import Animation from './Animation';


/**
 * Dropdown component
 * @param {object} props
 * @return {React} react component
 */
class Dropdown extends React.Component {
  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  /**
   * @return {undefined}
   */
  componentWillReceiveProps() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  /**
   * hides the dropdown menu
   * @return {undefined}
   */
  hideDropdown = () => {
    this.setState({ isOpen: false });
  }

  /**
   * display the dropdown menu
   * @return {undefined}
   */
  showDropdown = () => {
    this.setState({ isOpen: true });
  }

  /**
   * @return {React} List
   * render dropdown menu list
   */
  renderList = () => {
    if (!this.state.isOpen) return null;
    const {
      options,
      headerText
    } = this.props;

    return (
      <Animation name="dropdown-menu" timeOut={300}>
        <ul className="dropdown-menu">
          {headerText && <li
            className="dropdown-item dropdown-header"
            key={headerText}
          >
            {headerText}
          </li>}
          {headerText && <hr style={{ marginTop: 0 }} key="hrHeader" />}
          {
            options.map((option) => {
              const { label, action } = option;
              if (label === 'separator') {
                return <hr style={{ marginBottom: 0 }} key="separator" />;
              }
              return (
                <li
                  key={label}
                  className="dropdown-item"
                >
                  <div
                    onClick={action}
                    role="button"
                    tabIndex="0"
                  >
                    {label}
                  </div>
                </li>
              );
            })
          }
        </ul>
      </Animation>
    );
  }

  /**
   * render an overlay component
   * @return {React} Overlay
   */
  renderOverlay = () => {
    if (this.state.isOpen) {
      return (
        <div
          className="dropdown-overlay"
          onClick={this.hideDropdown}
          role="button"
          tabIndex="0"
        />
      );
    }
    return null;
  }

  /**
   * renders dropdown trigger
   * @return {React} trigger
   */
  renderTrigger = () => {
    const { Trigger } = this.props;
    if (Trigger) {
      return (
        <Trigger
          className="dropdown-toggle"
          onClick={this.showDropdown}
        />
      );
    }
    return (
      <div
        className="dropdown-toggle"
        onClick={this.showDropdown}
        role="button"
        tabIndex="0"
      >
        drop down
      </div>
    );
  }

  /**
   * dropdown
   * @return {React} dropdown
   */
  render() {
    return (
      <div
        className="dropdown"
      >
        {this.renderOverlay()}
        {this.renderTrigger()}
        {this.renderList()}
      </div>
    );
  }
}

Dropdown.propTypes = {
  Trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerText: PropTypes.string
};

Dropdown.defaultProps = {
  Trigger: null,
  headerText: null
};

export default Dropdown;
