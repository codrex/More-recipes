const Messages = require('../models/index').Messages;
const db = require('../models/index');
const validator = require('../validators/validator');
const reply = require('./reply');

module.exports = {
  validateMessageData: (req, res, next) => {
    const messageData = {
      content: req.body.content,
      priority: req.body.priority || 1,
      groupId: req.body.groupId,
      senderId: req.requestId,
    };
    const validate = validator.validateMessage(messageData);
    if (validate.valid) {
      req.body = messageData;
      next();
    } else {
      validate.error = validate.error.replace('Content', 'Message');
      reply.sendValidationError(res, validate);
    }
  },
  validateEditedMsgData: (req, res, next) => {
    const messageData = {
      content: req.body.content,
      messageId: req.body.messageId,
    };
    const validate =
    validator.validateAll(messageData, validator.constraint.editMsg);
    if (validate.valid) {
      next();
    } else {
      validate.error = validate.error.replace('Content', 'Message');
      reply.sendValidationError(res, validate);
    }
  },
  createMessage: (req, res, next) => {
    Messages.create(req.body)
    .then(message => {
      req.body.messageId = message.dataValues.id;
      next();
    }).catch(() => {
      reply.serverError(res);
    });
  },
  getMessage: (req, res) => {
    Messages.findOne({
      where: { id: req.body.messageId || req.params.messageid },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'groupId', 'senderId'],
      },
      include: [
          { model: db.Members, as: 'sender',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
            },
            { model: db.Groups, as: 'group',
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                },
              },
            { model: db.Members, as: 'viewers',
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'password'],
                },
          }],
    }).then(Message => {
      reply.sendSuccess(res, 200, 'Message', Message);
    }).catch(() => reply.serverError(res));
  },
  editMessage: (req, res, next) => {
    Messages.update(
      { content: req.body.content },
      {
        where: { id: req.params.messageid },
      }
    ).then(() => next())
    .catch(() => reply.serverError(res));
  },
  isSender: (req, res, next) => {
    Messages.findOne({
      where: {
        id: req.body.messageId,
      },
    }).then(msg => {
      if (msg === null) {
        reply.sendFail(res, 404, 'Message not found');
        return;
      }
      if (msg.dataValues.senderId !== req.requestId) {
        reply.sendFail(res, 403, 'Can only edit message sent by you');
        res.end();
      } else {
        next();
      }
    });
  },

};

