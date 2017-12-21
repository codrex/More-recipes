import { Viewers } from '../models/index';

/**
 * @name addViewer
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const addViewer = (req, res, next) => {
  Viewers.findOne(
    {
      where: {
        recipeId: req.params.id,
        userId: req.requestId
      }
    }
  )
    .then((viewer) => {
    // do nothing if user have viewed this recipe before
      if (viewer) {
        next();
      } else {
      // else add user as one of the viewers of this recipe
        Viewers.create({
          recipeId: req.params.id,
          userId: req.requestId
        }).then(() => {
          req.hasNewViewer = true;
          next();
        });
      }
    });
};

export default addViewer;
