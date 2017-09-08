import db from '../models/index';
import { serverError, sendFail } from '../reply/reply';
import { validateVote } from '../validators/validator';


const Votes = db.Votes;

export const voteValidation = (req, res, next) => {
  const data = {
    vote: req.query.vote,
    id: req.params.id,
  };
  const validate = validateVote(data);
  if (validate.valid) {
    next();
  } else {
    sendFail(res, 400, validate.error);
  }
};
const updateVote = (voteInstance, voteData, next) => {
  voteData.id = voteInstance.dataValues.id;
  voteInstance.update(voteData, { fields: ['id', 'upVote', 'downVote'] })
    .then(() => {
      next();
    });
};
export const VoteHandler = (req, res, next) => {
  const voteType = req.query.vote;
  const voteData = { upVote: voteType === 'upvote', downVote: voteType === 'downvote' };
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
        if (vote.dataValues.downVote && voteType === 'upvote') {
          updateVote(vote, voteData, next);
        } else if (vote.dataValues.upVote && voteType === 'downvote') {
          updateVote(vote, voteData, next);
        } else {
          vote.destroy({ force: true }).then(() => {
            next();
          });
        }
      }
    }).catch(error => {
      serverError(res, error);
    });
};

export const countVote = (req, res, next) => {
  Votes.count({ where: { upVote: true, RecipeId: req.params.id } })
  .then((upvote) => {
    req.body.upVotes = upvote;
    Votes.count({ where: { downVote: true, RecipeId: req.params.id } })
    .then((downvote) => {
      req.body.downVotes = downvote;
      next();
    });
  }).catch((error) => {
    serverError(res, error);
  });
};
