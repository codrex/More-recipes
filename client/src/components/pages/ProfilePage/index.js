import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import EditProfileForm from '../../common/form/editProfileForm';
import Modal from '../../common/modal/modal';
import TopBar from '../../common/topbar/topbar';
import Loader from '../../common/loader/loader';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import { getUserProfile, updateProfile } from '../../../actions/userActions';
import { setCurrentRecipe,
          deleteRecipe, toggleFav } from '../../../actions/recipeActions';
import UserInfo from './userInfo/userInfo';
import Recipes from './recipesList/recipesList';
import './profile.scss';


/**
 * Profile page component
 */
class ProfilePage extends React.Component {

  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: props.user.createdRecipes || [],
      filteredRecipes: null,
      active: 'createdRecipes',
      modalClose: true,
      modalTitle: '',
      currentId: null,
      recipeDeleted: false,
      noLoader: true,
    };

    // sets th current recipe to either created recipes or favorite recipes
    this.setActive = this.setActive.bind(this);
    // function that runs when edit icon is clicked
    this.modifyRecipe = this.modifyRecipe.bind(this);
    // sets recipes in state object to created recipes
    this.setRecipes = this.setRecipes.bind(this);
    // funtion that filter the list of recipes based on the value inputed into the search box
    this.searchValueChange = this.searchValueChange.bind(this);
    // function that runs when a recipe list item is clicked
    this.recipeItemClick = this.recipeItemClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onDeleteRecipeClicked = this.onDeleteRecipeClicked.bind(this);
    this.onFavRecipeClicked = this.onFavRecipeClicked.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.modalTitle = this.modalTitle.bind(this);
  }

  /**
   * @return {undefined}
   */
  componentDidMount() {
    if (Object.keys(this.props.user).length < 1) this.props.actions.getUserProfile();
  }

   /**
   * @return{undefined}
   */
  componentWillReceiveProps() {
    this.setRecipes();
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
    if (this.state.recipes !== nextProps.user.createdRecipes) {
      this.setState({ recipeDeleted: true });
    }
    if (this.state.recipes === nextProps.user.createdRecipes) {
      this.setState({ recipeDeleted: false });
    }
    return true;
  }
 /**
   * @return {undefined}
   * @param {string} modalTitle
   * @param {number} currentId
   */
  onDeleteRecipeClicked(modalTitle, currentId = null) {
    this.setState({ modalTitle, currentId, noLoader: true });
    this.onModalClose();
  }

   /**
   * @return {undefined}
   * @param {number} currentId
   */
  onFavRecipeClicked(currentId) {
    this.setState({ noLoader: true });
    this.props.actions.removeFromFav(currentId);
  }

    /**
   * @return {undefined}
   */
  onModalClose() {
    this.setState({
      modalClose: !this.state.modalClose,
      recipeDeleted: this.state.recipeDeleted && false,
    });
  }

  /**
   * @returns{undefined}
   */
  setRecipes() {
    this.setState({
      recipes: this.props.user[this.state.active],
    });
  }

   /**
   * @returns{undefined}
   * @param{string}active
   */
  setActive(active) {
    this.setState({
      recipes: this.props.user[active],
      active,
    });
  }

  /**
   * @returns{undefined}
   * @param{string} modalTitle
   */
  modalTitle(modalTitle) {
    this.setState({
      modalTitle
    });
  }

   /**
   * @return {undefined}
   */
  deleteRecipe() {
    this.props.actions.deleteRecipe(this.state.currentId);
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
   * @param {number} id
   */
  modifyRecipe(id) {
    this.props.history.push(`/recipe/modify/${id}`);
  }

  /**
   * @return {undefined}
   * @param {object} item
   */
  recipeItemClick(item) {
    this.props.actions.currentRecipe(item);
    this.props.history.push(`recipe/${item.id}`);
  }

  /**
   * @return {undefined}
   */
  render() {
    const { user } = this.props;
    const showLoader = this.props.loading && this.state.modalClose && !this.state.noLoader;
    return (
      <div className="container-fluid profile-page">
        <div className="row">
          <TopBar title="Profile page" />
        </div>
        {!showLoader &&
          <div className="row user-info-wrapper">
            <UserInfo user={user} editBtnClicked={this.modalTitle} />
          </div>
        }
        {!showLoader &&
          <div className="row">
            <TopBar className="recipe-list-header" search handleSubmit={this.searchValueChange}>
              <div className="d-flex">
                <li
                  className={classnames('text-capitalize nav-link nav-item',
                  this.state.active === 'createdRecipes' ? 'active' : '')}
                  onClick={() => this.setActive('createdRecipes')}
                >
                my recipes
                </li>
                <li
                  className={classnames('text-capitalize nav-link nav-item',
                  this.state.active === 'favRecipes' ? 'active' : '')}
                  onClick={() => this.setActive('favRecipes')}
                >
                favorite recipes
                </li>
              </div>
            </TopBar>
            <Recipes
              recipes={this.state.filteredRecipes || this.state.recipes}
              onEditIconCliked={this.modifyRecipe}
              onDeleteIconClicked={this.onDeleteRecipeClicked}
              handleClick={this.recipeItemClick}
              onFavIconClicked={this.onFavRecipeClicked}
              type={this.state.active}
            />
          </div>
        }

        <Modal
          id="editProfileModal"
          center
          title={this.state.modalTitle}
          closeBtnClicked={this.modalClose}
          onContinueClicked={this.deleteRecipe}
          right
          left
          footer={this.state.modalTitle === 'Delete recipe'}
          loading={this.props.loading}
          operationCompleted={this.state.recipeDeleted}
        >
          {this.state.modalTitle === 'Delete recipe' &&
            <div className="modal-body text-white" >
              {!this.state.recipeDeleted && !this.props.loading &&
                <h1>Are u sure u want to delete this recipe ?</h1>}

              {this.state.recipeDeleted && !this.props.loading &&
                <h1>Recipe succefully deleted</h1>}

              {this.props.loading && <h1>Deleting...</h1>}

              {!this.state.recipeDeleted && !this.props.loading &&
                <p className="lead text-white">  To delete this recipe click on continue</p>}

            </div>
          }
          {

            this.state.modalTitle === 'Update profile' &&
              <div className="modal-body text-white" >
                <EditProfileForm
                  update={this.props.actions.update}
                  loading={this.props.loading}
                />
              </div>
          }
        </Modal>
        <Loader loading={showLoader} />
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
    success: state.ajaxSuccess.success,
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      redirect: bindActionCreators(ajaxRedirect, dispatch),
      getUserProfile: bindActionCreators(getUserProfile, dispatch),
      update: bindActionCreators(updateProfile, dispatch),
      currentRecipe: bindActionCreators(setCurrentRecipe, dispatch),
      deleteRecipe: bindActionCreators(deleteRecipe, dispatch),
      removeFromFav: bindActionCreators(toggleFav, dispatch),
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
