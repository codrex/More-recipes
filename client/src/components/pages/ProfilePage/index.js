import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import EditProfileForm from '../../common/form/editProfileForm';
import Modal from '../../common/modal/modal';
import TopBar from '../../common/topbar/topbar';
import { bindActionCreators } from 'redux';
import { ajaxRedirect } from '../../../actions/ajaxActions';
import { getUserProfile, updateProfile } from '../../../actions/userActions';
import { toModifyRecipe, setCurrentRecipe, deleteRecipe } from '../../../actions/recipeActions';
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
      recipes: props.user.createdRecipes,
      filteredRecipes: null,
      active: 'createdRecipes',
      modalClose: true,
      modalTitle: '',
      currentId: null,
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
    this.modalClose = this.modalClose.bind(this);
    this.onDeleteRecipeClicked = this.onDeleteRecipeClicked.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
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
    return true;
  }
 /**
   * @return {undefined}
   * @param {string} modalTitle
   * @param {number} currentId
   */
  onDeleteRecipeClicked(modalTitle, currentId = null) {
    this.setState({ modalTitle, currentId });
    this.modalClose();
  }
  /**
   * @returns{undefined}
   */
  setRecipes() {
    this.setState({ recipes: this.props.user.createdRecipes });
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
   * @param {Object} recipe
   */
  modifyRecipe(recipe) {
    this.props.actions.modifyRecipe(recipe);
    this.props.history.push('/recipe/modify');
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
  modalClose() {
    this.setState({ modalClose: !this.state.modalClose });
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
          <UserInfo user={user} editBtnClicked={this.modalTitle} />
        </div>
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
          />
          <Modal
            id="editProfileModal"
            center
            title={this.state.modalTitle}
            closeBtnClicked={this.modalClose}
            onContinueClicked={this.deleteRecipe}
            right
            left
            footer={this.state.modalTitle === 'Delete recipe'}
          >
            {this.state.modalTitle === 'Delete recipe' &&
              <div className="modal-body text-white" >
                <h1>Are u sure u want to delete this recipe ?</h1>
                <p className="lead text-white">  To delete this recipe click on continue</p>
              </div>
            }
            {
              !this.props.loading &&
              this.state.modalTitle === 'Update profile' &&
                <EditProfileForm update={this.props.actions.update} />
            }
          </Modal>
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
      modifyRecipe: bindActionCreators(toModifyRecipe, dispatch),
      currentRecipe: bindActionCreators(setCurrentRecipe, dispatch),
      deleteRecipe: bindActionCreators(deleteRecipe, dispatch),
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
