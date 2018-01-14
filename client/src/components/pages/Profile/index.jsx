import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paginator from '../../common/Paginator';
import EditProfileForm from './EditProfileForm';
import Modal from '../../common/Modal';
import Loader from '../../common/Loader';
import { resetSuccess } from '../../../actions/ajaxActions';
import resetPageCount from '../../../actions/resetPageCount';
import { getUserProfile, updateProfile } from '../../../actions/userActions';
import UserInfo from './UserInfo';
import Recipes from './RecipeList';
import HeroArea from '../../common/HeroArea';
import { PROFILE_PAGE_PIX } from '../../../constants';
import NotFound from '../../common/NotFound';
import Button from '../../common/Button';
import {
  deleteRecipe,
  toggleFav,
  getCreatedRecipes,
  resetRecipes
} from '../../../actions/recipeActions';


/**
 * Profile page component
 */
class Profile extends React.Component {
  /**
   * constructor
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    props.actions.resetPageCount();
    props.actions.resetRecipes();
    props.actions.resetSuccess();

    this.state = {
      recipes: props.user.createdRecipes,
      isModalOpen: false,
      modalTitle: '',
      currentId: null,
      currentIndex: null,
      recipeDeleted: props.success,
      noLoader: false,
    };
  }

  /**
   * @return {undefined}
   */
  componentDidMount() {
    const { actions } = this.props;
    if (!this.props.user.username) {
      actions.getProfile();
    }
    actions.getCreatedRecipes(1);
  }

  /**
   * @return{undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipeDeleted: nextProps.success
    });

    if ((this.props !== nextProps) && !this.state.noLoader) {
      this.setState({
        noLoader: true
      });
    }
  }

  /**
   * delete button click event handler
   * @return {undefined}
   * @param {string} modalTitle
   * @param {number} currentId
   * @param {number} currentIndex
   */
  onDeleteRecipeClicked = (modalTitle, currentId = null, currentIndex = null) => {
    this.setState({
      modalTitle,
      currentId,
      currentIndex,
      noLoader: true
    });
    this.onModalOpen();
  }

  /**
   * modal close
   * @return {undefined}
   */
  onModalClose = () => {
    this.setState({
      isModalOpen: false
    });
    this.props.actions.resetSuccess();
  }

  /**
   * modal open
   * @return {undefined}
   */
  onModalOpen = () => {
    this.setState({
      isModalOpen: true
    });
    this.props.actions.resetSuccess();
  }

  /**
   * edit profile click event handler
   * @returns{undefined}
   * @param{string} title
   */
  editProfileClicked = (title) => {
    if (title) {
      this.setState({
        modalTitle: 'Update profile'
      });
      this.onModalOpen();
    }
  }

  /**
   * delete recipe
   * @return {undefined}
   * @param {number} index
   */
  deleteRecipe = () => {
    const { currentId, currentIndex } = this.state;
    this.props.actions.deleteRecipe(currentId, currentIndex);
    if (this.props.success) this.props.actions.resetSuccess();
  }

  /**
   * modify recipe
   * @returns{undefined}
   * @param {number} id
   */
  modifyRecipe = (id) => {
    this.props.history.push(`/modify/${id}`);
  }

  /**
   * recipe item click event handler
   * @return {undefined}
   * @param {object} item
   */
  recipeItemClick = (item) => {
    this.props.history.push(`recipe/${item.id}`);
  }

  /**
   * pagination
   * @return {React} jsx
   */
  renderPagination = () => {
    const {
      pageCount,
      actions,
      loading
    } = this.props;
    if (pageCount > 1) {
      return (
        <Paginator
          pageCount={pageCount}
          loading={loading}
          handlePageClick={({ selected }) => {
            actions.getCreatedRecipes(selected + 1);
          }}
        />
      );
    } return null;
  }

  /**
   * user info
   * @return {React} jsx
   */
  renderUserInfo = () => {
    if (this.state.noLoader) {
      const { user } = this.props;
      return (
        <HeroArea image={PROFILE_PAGE_PIX}>
          <UserInfo user={user} editBtnClicked={this.editProfileClicked} />
        </HeroArea>
      );
    }
  }

  /**
   * user's created recipe
   * @return {React} jsx
   */
  renderUserRecipes = () => {
    const {
      noLoader,
      isModalOpen
    } = this.state;

    const {
      recipes,
      history,
      loading
    } = this.props;

    if (loading && noLoader && !isModalOpen) {
      return (
        <div className="container-fluid profile-page no-padding">
          <Loader loading={loading} />
        </div>
      );
    }

    if (recipes.length < 1 && !loading) {
      return (
        <NotFound message="you have no recipes" >
          <Button
            text="add recipe"
            className="btn-secondary-outline btn-lg"
            handleClick={() => {
              history.push('/create');
            }}
          />
        </NotFound>
      );
    }

    if (noLoader) {
      return (
        <div className="row col-xs-12 col-sm-12 col-md-10 col-lg-10 center-margin">
          <Recipes
            recipes={recipes}
            onEditIconCliked={this.modifyRecipe}
            onDeleteIconClicked={this.onDeleteRecipeClicked}
            handleClick={this.recipeItemClick}
          />
        </div>
      );
    }
  }

  /**
   * render modal component
   * @return {React} jsx
   */
  renderModal = () => {
    const {
      loading,
      actions
    } = this.props;
    const {
      modalTitle,
      recipeDeleted
    } = this.state;
    return (
      <Modal
        id="editProfileModal"
        center
        title={modalTitle}
        closeBtnClicked={this.onModalClose}
        onContinueClicked={this.deleteRecipe}
        right
        left
        footer={modalTitle === 'Delete recipe'}
        loading={loading}
        operationCompleted={recipeDeleted}
      >
        {
          modalTitle === 'Delete recipe' &&
          <div className="modal-body text-dark" >
            <h1>
              {!recipeDeleted && !loading &&
            'Are u sure u want to delete this recipe ?'}
              {loading && ' Deleting...'}
              {recipeDeleted && !loading &&
              'Recipe succefully deleted'
              }
            </h1>
            {!recipeDeleted && !loading &&
            <p className="lead">  To delete this recipe click on continue</p>}

          </div>
        }
        {
          modalTitle === 'Update profile' &&
            <div className="modal-body text-white" >
              <EditProfileForm
                update={actions.update}
                loading={loading}
              />
            </div>
        }
      </Modal>
    );
  }

  /**
   * render
   * @return {undefined}
   */
  render() {
    return (
      <div className="container-fluid profile-page no-padding">
        {this.renderUserInfo()}
        {this.renderUserRecipes()}
        {this.renderPagination()}
        {this.renderModal()}
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  actions: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  success: PropTypes.bool.isRequired,
  pageCount: PropTypes.number,
};

Profile.defaultProps = {
  pageCount: 0,
};

const mapStateToProps = state => (
  {
    loading: state.networkRequest.loading,
    user: state.user,
    recipes: state.recipes,
    success: state.networkRequest.success,
    pageCount: state.pageCount,
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: {
      getProfile: bindActionCreators(getUserProfile, dispatch),
      update: bindActionCreators(updateProfile, dispatch),
      deleteRecipe: bindActionCreators(deleteRecipe, dispatch),
      removeFromFav: bindActionCreators(toggleFav, dispatch),
      resetSuccess: bindActionCreators(resetSuccess, dispatch),
      getCreatedRecipes: bindActionCreators(getCreatedRecipes, dispatch),
      resetPageCount: bindActionCreators(resetPageCount, dispatch),
      resetRecipes: bindActionCreators(resetRecipes, dispatch)
    }
  }
);

export { Profile as PureProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
