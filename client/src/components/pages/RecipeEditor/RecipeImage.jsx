import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { updateImage } from '../../../actions/recipeActions';
import imageParser from '../../../utils/imageParser';
import { DEFAULT_RECIPE_PIX } from '../../../constants';
import toastrConfig from '../../../toastr/toastrConfig';


/**
 * ReactImage uploader component
 */
class RecipeImage extends React.Component {
  /**
   * constructor
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const { image } = props;
    this.state = {
      image: imageParser(image)
    };

    try {
      this.uploader = this.createUploadWidget();
    } catch (error) {
      // pass
    }
  }

  /**
   * @return {undefined}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { image } = nextProps;
      this.setState({ image: imageParser(image) });
    }
  }

  /**
   * creates cloudinary image upload widget
   * @return {undefined}
   */
  createUploadWidget = () => cloudinary.createUploadWidget(
    {
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      upload_preset: process.env.CLOUDINARY_PRESET,
      sources: ['local', 'url'],
      client_allowed_formats: ['png', 'gif', 'jpeg'],
      folder: 'recipes',
    },
    (error, result) => {
      const {// eslint-disable-next-line camelcase
        public_id, // eslint-disable-next-line camelcase
        secure_url,
        signature, // eslint-disable-next-line camelcase
        thumbnail_url,
        url
      } = result[0];
      const image = {
        publicId: public_id,
        secureUrl: secure_url,
        signature,
        thumbnailUrl: thumbnail_url,
        url
      };
      this.props.updateImage(JSON.stringify(image));
    }
  )

  /**
   * open cloudinary upload widget
   * @return {undefined}
   */
  openImageUploader = () => {
    try {
      this.uploader.open();
    } catch (error) {
      toastr.error(`Sorry, error encountered, check your
      internet connection and try reloading the page`, 'Error', toastrConfig);
    }
  }

  /**
   * render
   * @return {ReactElement} react component
   */
  render() {
    const { image } = this.state;
    return (
      <div className="image-container">
        <h4 className="items-header-text">
          Recipe image
        </h4>
        <div className="display-4">
          <Image
            cloudName="resycom"
            publicId={image.publicId || DEFAULT_RECIPE_PIX}
            width="400"
            height="500"
            crop="fit"
            className="recipe-card-img"
          />
          <span
            role="button"
            tabIndex="0"
            onClick={this.openImageUploader}
            className="btn bg-secondary"
          >
            {image.url ? 'Change image' : 'Upload image'}
          </span>
        </div>
      </div>
    );
  }
}

RecipeImage.propTypes = {
  image: PropTypes.string.isRequired,
  updateImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  image: state.recipe.image
});

export { RecipeImage as PureRecipeImage };
export default connect(mapStateToProps, { updateImage })(RecipeImage);
