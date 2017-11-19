import db from '../models/index';
import { serverError } from '../reply/reply';
import { validateVote, validationHandler } from '../validators/validator';

const Votes = db.Votes;
const updateVote = (voteInstance, voteData, next) => {
  voteData.id = voteInstance.dataValues.id;
  voteInstance.update(voteData, {
    fields: ['id', 'upVote', 'downVote']
  })
    .then(() => {
      next();
    });
};
export const voteValidation = (req, res, next) => {
  const { up, down } = req.query;
  const data = {
    vote: up || down,
    id: req.params.id,
  };
  validationHandler(data, validateVote, req, res, next);
};
export const VoteHandler = (req, res, next) => {
  let { up, down } = req.query;
  if (up) up = JSON.parse(up.toLowerCase());
  if (down) down = JSON.parse(down.toLowerCase());
  const voteData = {
    upVote: up || false,
    downVote: down || false
  };
  Votes.findOne(
    {
      where: {
        voterId: req.requestId,
        RecipeId: req.params.id,
      }
    }).then((vote) => {
      voteData.voterId = req.requestId;
      voteData.RecipeId = req.params.id;
      if (!vote) {
        Votes.create(voteData)
          .then(() => {
            next();
          });
      } else {
        if (up === true) {
          updateVote(vote, voteData, next);
        } else if (down === true) {
          updateVote(vote, voteData, next);
        } else {
          vote.destroy({
            force: true
          }).then(() => {
            next();
          });
        }
      }
    }).catch(() => {
      serverError(res);
    });
};
export const countVote = (req, res, next) => {
  Votes.count({
    where: {
      upVote: true,
      RecipeId: req.params.id
    }
  })
  .then((upvote) => {
    req.body.upVotes = upvote;
    Votes.count({
      where: {
        downVote: true,
        RecipeId: req.params.id
      }
    })
    .then((downvote) => {
      req.body.downVotes = downvote;
      next();
    });
  }).catch(() => {
    serverError(res);
  });
};
