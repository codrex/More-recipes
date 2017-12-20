import React from 'react';
import dotenv from 'dotenv';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';
import { updateImage } from '../../../../actions/recipeActions';
import imageParser from '../../../../utils/imageParser/imageParser';
import { DEFAULT_RECIPE_PIX } from '../../../../constants/constants';

dotenv.config();

/**
 * ReactImage uploader component
 */
class RecipeImage extends React.Component {
  /**
   * @return {undefined}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const { image } = props;
    this.state = {
      image: imageParser(image)
    };
    this.loadImage = this.loadImage.bind(this);
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
   * @return {undefined}
   */
  loadImage() {
    cloudinary.openUploadWidget({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      upload_preset: process.env.CLOUDINARY_PRESET,
      sources: ['local', 'url'],
      client_allowed_formats: ['png', 'gif', 'jpeg'],
      folder: 'recipes',
    },
    (error, result) => {
      const {
        public_id,
        secure_url,
        signature,
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
    });
  }

  /**
   * @return {ReactElement} Image
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
            crop="fill"
            className="recipe-card-img"
          />
          <span
            role="button"
            tabIndex="0"
            onClick={this.loadImage}
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

export default connect(mapStateToProps, { updateImage })(RecipeImage);
