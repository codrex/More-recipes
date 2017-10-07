import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '../../common/icon/icon';
import EditProfileForm from '../../common/form/editProfileForm';
import Modal from '../../common/modal/modal';
import TopBar from '../../common/topbar/topbar';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import { getUserProfile, updateProfile } from '../../../actions/userActions';
import UserInfo from './userInfo/userInfo';
import Recipes from './recipesList/recipesList';
import './profile.scss';


/**
 * Profile pagr component
 */
class ProfilePage extends React.Component {

  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      myRecipes: true,
      recipes: props.user.favRecipes,
      filteredRecipes: null,

    };
    this.toggleRecipes = this.toggleRecipes.bind(this);
    this.setRecipes = this.setRecipes.bind(this);
    this.searchValueChange = this.searchValueChange.bind(this);
  }

  /**
   * @return {undefined}
   */
  componentDidMount() {
    this.props.actions.getUserProfile();
  }

  /**
   *
   * @param {object} nextProps
   * @return {bool} true or false
   */
  shouldComponentUpdate(nextProps) {
    if (nextProps.redirectUrl === '/') {
      // redirect authenticated user to home page
      // in other to login pr signup
      // the current page url is save via the redirect action creator
      // doing this will enable the user to be re-route back to this page
      // after a successful authentication
      this.props.actions.redirect('/user');
      this.props.history.push(nextProps.redirectUrl);
      return false;
    }
    return true;
  }

  /**
   * @return{undefined}
   */
  componentWillReceiveProps() {
    this.setRecipes();
  }

  /**
   * @returns{undefined}
   */
  setRecipes() {
    this.setState({ recipes: this.props.user.favRecipes });
  }

  /**
   * @return {undefined}
   * @param {string} value
   */
  searchValueChange(value) {
    if (value.length < 1) {
      this.setState({ filteredRecipes: null });
      return;
    }

    const filteredRecipes = this.state.recipes
    .filter((recipe) => recipe.recipeName.slice(0, value.length) === value);
    this.setState({ filteredRecipes });
  }

   /**
   * @returns{undefined}
   */
  toggleRecipes() {
    this.setState({ myRecipes: !this.state.myRecipes });
  }

  /**
   * @return {undefined}
   */
  render() {
    const { user } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <TopBar >
            <h1 className="text-white text-capitalize">Profile page</h1>
          </TopBar>
        </div>
        <div className="row user-info-wrapper">
          <UserInfo user={user} />
        </div>
        <div className="row">
          <TopBar className="recipe-list-header" search handleSubmit={this.searchValueChange}>
            <div className="d-flex">
              <li className="text-capitalize nav-link nav-item">my recipes</li>
              <li className="text-capitalize nav-link nav-item">favorite recipes</li>
            </div>
          </TopBar>
          <Modal
            id="editProfileModal"
            center
            rightBtnText="Login"
            title={'Update profile'}
          >
            {!this.props.loading && <EditProfileForm update={this.props.actions.update} />}
          </Modal>
          <Recipes recipes={this.state.filteredRecipes || this.state.recipes} />
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  recipes: PropTypes.object,
  user: PropTypes.object,
  actions: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => (
  {
    redirectUrl: state.redirectUrl,
    loading: state.ajaxCall > 0,
    user: state.user,
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      redirect: bindActionCreators(ajaxRedirect, dispatch),
      getUserProfile: bindActionCreators(getUserProfile, dispatch),
      update: bindActionCreators(updateProfile, dispatch),
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
