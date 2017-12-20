import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paginator from '../../common/paginator/paginator';
import EditProfileForm from './editProfileForm/editProfileForm';
import Modal from '../../common/modal/modal';
import Loader from '../../common/loader/loader';
import { resetSuccess } from '../../../actions/ajaxActions';
import { getUserProfile, updateProfile } from '../../../actions/userActions';
import { deleteRecipe, toggleFav, getCreatedRecipes } from '../../../actions/recipeActions';
import UserInfo from './userInfo/userInfo';
import Recipes from './recipesList/recipesList';
import HeroArea from '../../common/heroArea/heroArea';
import { PROFILE_PAGE_PIX } from '../../../constants/constants';
import NotFound from '../../common/notFound/notFound';
import Button from '../../common/button/button';

/**
 * @summary Profile page component
 * @return {React} ProfilePage
 */
export class ProfilePage extends React.Component {
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
      isModalOpen: false,
      modalTitle: '',
      currentId: null,
      currentIndex: null,
      recipeDeleted: props.success,
      noLoader: false,
      currentPage: 1,
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
    this.setState({
      noLoader: true
    });
  }
  /**
   * @return{undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setRecipes();
    this.setState({
      recipeDeleted: nextProps.success
    });
  }
  /**
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
   * @return {undefined}
   */
  onModalClose = () => {
    this.setState({
      isModalOpen: false
    });
    this.props.actions.resetSuccess();
  }
  /**
   * @return {undefined}
   */
  onModalOpen = () => {
    this.setState({
      isModalOpen: true
    });
    this.props.actions.resetSuccess();
  }
  /**
   * @returns{undefined}
   */
  setRecipes = () => {
    this.setState({
      recipes: this.props.user[this.state.active],
    });
  }
  /**
   * @returns{undefined}
   * @param{string} modalTitle
   */
  editProfileClicked = (modalTitle) => {
    this.setState({
      modalTitle
    });
    this.onModalOpen();
  }
  /**
   * @return {undefined}
   * @param {number} index
   */
  deleteRecipe = () => {
    const { currentId, currentIndex } = this.state;
    this.props.actions.deleteRecipe(currentId, currentIndex);
    if (this.props.success) this.props.actions.resetSuccess();
  }
  /**
   * @returns{undefined}
   * @param {number} id
   */
  modifyRecipe = (id) => {
    this.props.history.push(`/modify/${id}`);
  }
  /**
   * @return {undefined}
   * @param {object} item
   */
  recipeItemClick = (item) => {
    this.props.history.push(`recipe/${item.id}`);
  }
  /**
   * @return {React} jsx
   */
  renderPagination = () => {
    const {
      pageCount,
      actions
    } = this.props;
    if (pageCount > 1) {
      return (
        <Paginator
          pageCount={pageCount}
          handlePageClick={({ selected }) => {
            actions.getCreatedRecipes(selected + 1);
          }}
        />
      );
    } return null;
  }
  /**
   * @return {React} jsx
   */
  renderUSerInfo = () => {
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
   * @return {React} jsx
   */
  renderUSerRecipes = () => {
    if (this.state.noLoader) {
      const {
        recipes,
        history
      } = this.props;
      if (recipes.length < 1) {
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
      return (
        <div className="row col-xs-12 col-sm-12 col-md-10 col-lg-10 center-margin">
          <Recipes
            recipes={recipes}
            onEditIconCliked={this.modifyRecipe}
            onDeleteIconClicked={this.onDeleteRecipeClicked}
            handleClick={this.recipeItemClick}
            type={this.state.active}
          />
          {this.renderPagination()}
        </div>
      );
    }
  }
  /**
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
        {modalTitle === 'Delete recipe' &&
          <div className="modal-body text-dark" >
            {!recipeDeleted && !loading &&
            <h1>Are u sure u want to delete this recipe ?</h1>}

            {loading && <h1>Deleting...</h1>}

            {recipeDeleted && !loading &&
            <h1>Recipe succefully deleted</h1>}

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
   * @return {undefined}
   */
  render() {
    const { loading } = this.props;
    const {
      noLoader,
      isModalOpen
    } = this.state;
    return (
      <div className="container-fluid profile-page no-padding">
        {this.renderUSerInfo()}
        {this.renderUSerRecipes()}
        {this.renderModal()}
        {!noLoader && <Loader loading={loading && !isModalOpen} />}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  actions: PropTypes.objectOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  success: PropTypes.bool.isRequired,
  pageCount: PropTypes.number,
};

ProfilePage.defaultProps = {
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
      getCreatedRecipes: bindActionCreators(getCreatedRecipes, dispatch)
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
