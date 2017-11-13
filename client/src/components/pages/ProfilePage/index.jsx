import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Paginator from '../../common/paginator/paginator';
import EditProfileForm from '../../common/form/editProfileForm';
import Modal from '../../common/modal/modal';
import TopBar from '../../common/topbar/topbar';
import Loader from '../../common/loader/loader';
import { bindActionCreators } from 'redux';
import { resetSuccess } from '../../../actions/ajaxActions';
import { getUserProfile, updateProfile } from '../../../actions/userActions';
import { deleteRecipe, toggleFav } from '../../../actions/recipeActions';
import UserInfo from './userInfo/userInfo';
import Recipes from './recipesList/recipesList';
import { getCurrentPage, getPageCount } from '../../../utils/pagination/pagination';

const OFFSET = 10;
const PIX = 'https://res.cloudinary.com/resycom/image/upload/c_scale,h_728,q_51/v1510430032/lily-lvnatikk-365344_nv94dc.jpg';
/**
 * Profile page component
 */
export class ProfilePage extends React.Component {

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
      isModalOpen: false,
      modalTitle: '',
      currentId: null,
      currentIndex: null,
      recipeDeleted: props.success,
      noLoader: false,
      currentPage: 1,
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
    // function runs when modal closes
    this.onModalClose = this.onModalClose.bind(this);
    // function runs when modal opens
    this.onModalOpen = this.onModalOpen.bind(this);
    // function runs when delete recipe icon is click
    this.onDeleteRecipeClicked = this.onDeleteRecipeClicked.bind(this);
    // this runs when user unfavorite a recipe
    this.onFavRecipeClicked = this.onFavRecipeClicked.bind(this);
    // delete a selected recipe
    this.deleteRecipe = this.deleteRecipe.bind(this);
    // sets the modal title
    this.editProfileClicked = this.editProfileClicked.bind(this);
    // returns number of pages for pagination
    this.getPageCount = this.getPageCount.bind(this);
    // get the current set of recipes to show
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * @return {undefined}
   */
  componentDidMount() {
    if (!this.props.user.username) {
      this.props.actions.getProfile();
    }
    this.setState({ noLoader: true });
  }

   /**
   * @return{undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setRecipes();
    this.setState({ recipeDeleted: nextProps.success });
  }

 /**
   * @return {undefined}
   * @param {string} modalTitle
   * @param {number} currentId
   * @param {number} currentIndex
   */
  onDeleteRecipeClicked(modalTitle, currentId = null, currentIndex = null) {
    this.setState({ modalTitle, currentId, currentIndex, noLoader: true });
    this.onModalOpen();
  }

   /**
   * @return {undefined}
   * @param {number} currentId
   */
  onFavRecipeClicked(currentId) {
    this.props.actions.removeFromFav(currentId);
  }

    /**
   * @return {undefined}
   */
  onModalClose() {
    this.setState({ isModalOpen: false });
    this.props.actions.resetSuccess();
  }
  /**
   * @return {undefined}
   */
  onModalOpen() {
    this.setState({ isModalOpen: true });
    this.props.actions.resetSuccess();
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
   * @returns{number} pageNumber
   * @param {array} recipes
   */
  getPageCount(recipes) {
    return getPageCount(recipes.length, OFFSET);
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
   * @param {object} number
   */
  handlePageClick(number) {
    this.setState({ currentPage: number.selected + 1 });
  }

  /**
   * @returns{undefined}
   * @param{string} modalTitle
   */
  editProfileClicked(modalTitle) {
    this.setState({
      modalTitle
    });
    this.onModalOpen();
  }

   /**
   * @return {undefined}
   * @param {number} index
   */
  deleteRecipe() {
    const { currentId, currentIndex } = this.state;
    this.props.actions.deleteRecipe(currentId, currentIndex);
    if (this.props.success) this.props.actions.resetSuccess();
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
    .filter((recipe) => recipe.recipeName
    .slice(0, value.length).toUpperCase() === value.toUpperCase());
    this.setState({ filteredRecipes });
  }

  /**
   * @returns{undefined}
   * @param {number} id
   */
  modifyRecipe(id) {
    this.props.match.history.push(`/recipe/modify/${id}`);
  }

  /**
   * @return {undefined}
   * @param {object} item
   */
  recipeItemClick(item) {
    this.props.match.history.push(`recipe/${item.id}`);
  }

  /**
   * @return {undefined}
   */
  render() {
    const { user, loading } = this.props;
    const { currentPage, filteredRecipes, recipes } = this.state;
    let currentRecipes = filteredRecipes || recipes;
    currentRecipes = getCurrentPage(currentRecipes, currentPage, OFFSET);
    return (
      <div className="container-fluid profile-page">
        <div className="row">
          <TopBar title="Profile page" bottom search handleChange={this.searchValueChange}>
            <nav className="d-flex no-margin">
              <li
                id="createdRecipes"
                className={classnames('text-capitalize nav-link',
                this.state.active === 'favRecipes' ? 'text-white' : '')}
                onClick={() => this.setActive('createdRecipes')}
              >
              my recipes
              </li>
              <li
                id="favRecipes"
                className={classnames('text-capitalize nav-link',
                this.state.active === 'favRecipes' ? 'text-white' : '')}
                onClick={() => this.setActive('favRecipes')}
              >
              favorite recipes
              </li>
            </nav>
          </ TopBar>
        </div>
        {this.state.noLoader &&
          <div className="row user-info-wrapper">
            <div className="backdrop">
              <img src={PIX} alt="backdrop pix" />
            </div>
            <UserInfo user={user} editBtnClicked={this.editProfileClicked} />
          </div>
        }
        {this.state.noLoader &&
          <div className="row col-xs-12 col-sm-12 col-md-10 col-lg-10 center-margin">
            <Recipes
              recipes={currentRecipes}
              onEditIconCliked={this.modifyRecipe}
              onDeleteIconClicked={this.onDeleteRecipeClicked}
              handleClick={this.recipeItemClick}
              onFavIconClicked={this.onFavRecipeClicked}
              type={this.state.active}
            />
            <Paginator
              pageCount={this.getPageCount(filteredRecipes || recipes)}
              handlePageClick={this.handlePageClick}
            />
          </div>
        }

        <Modal
          id="editProfileModal"
          center
          title={this.state.modalTitle}
          closeBtnClicked={this.onModalClose}
          onContinueClicked={this.deleteRecipe}
          right
          left
          footer={this.state.modalTitle === 'Delete recipe'}
          loading={this.props.loading}
          operationCompleted={this.state.recipeDeleted}
        >
          {this.state.modalTitle === 'Delete recipe' &&
            <div className="modal-body text-dark" >
              {!this.state.recipeDeleted && !this.props.loading &&
                <h1>Are u sure u want to delete this recipe ?</h1>}

              {this.props.loading && <h1>Deleting...</h1>}

              {this.state.recipeDeleted && !this.props.loading &&
                <h1>Recipe succefully deleted</h1>}

              {!this.state.recipeDeleted && !this.props.loading &&
                <p className="lead">  To delete this recipe click on continue</p>}

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
        {!this.state.noLoader &&
          <Loader loading={loading && !this.state.isModalOpen} />
        }
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => (
  {
    redirectUrl: state.redirectUrl,
    loading: state.networkRequest.loading,
    user: state.user,
    success: state.networkRequest.success,
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    actions: {
      getProfile: bindActionCreators(getUserProfile, dispatch),
      update: bindActionCreators(updateProfile, dispatch),
      deleteRecipe: bindActionCreators(deleteRecipe, dispatch),
      removeFromFav: bindActionCreators(toggleFav, dispatch),
      resetSuccess: bindActionCreators(resetSuccess, dispatch),
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
