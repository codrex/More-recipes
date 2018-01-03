/**
 * image parser
 * @return {object} image
 * @param {string} image
 */
const imageParser = (image) => {
  try {
    const parsedImage = JSON.parse(image);
    if (parsedImage instanceof Object) {
      return parsedImage;
    }
    return {};
  } catch (e) {
    return {};
  }
};

export default imageParser;
