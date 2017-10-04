import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '../../common/icon/icon';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import UserInfo from './userInfo/userInfo';

/**
 * Profile pagr component
 */
class ProfilePage extends React.Component {

  /**
   * @param {object} props
   */


  /**
   *
   * @param {object} nextProps
   * @return {bool} true or false
   */
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.redirectUrl === '/') {
  //     // redirect authenticated user to home page
  //     // in other to login pr signup
  //     // the current page url is save via the redirect action creator
  //     // doing this will enable the user to be re-route back to this page
  //     // after a successful authentication
  //     this.props.actions.redirect('/recipes');
  //     this.props.history.push(nextProps.redirectUrl);
  //     return false;
  //   }
  //   return true;
  // }

  /**
   * @return {undefined}
   */
  render() {
    const { actions } = this.props;
    return (
      <div className="container-fluid">
        <UserInfo />
      </div>
    );
  }
}

ProfilePage.propTypes = {
};

const mapStateToProps = (state) => (
  {
    redirectUrl: state.redirectUrl,
    user: state.user,
    loading: state.ajaxCall > 0
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      redirect: bindActionCreators(ajaxRedirect, dispatch),
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
