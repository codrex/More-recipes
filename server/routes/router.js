const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller.js');
const groupController = require('../controllers/groupcontroller.js');

// get all message in a group route
router.get(' /api/group/:groupid/messages', (req, res) => {

});

// registration route
router.post('/api/user/signup', (req, res) => {
  userController.createUser(res, req);
});

// login route
router.post('/api/user/signin', (req, res) => {

});

// create broadcast group route
// router.post('/api/group', (req, res) => {
//   Users.findOne({
//     where: { user_id: id },
//   }).then(returnObj => {
//     returnObj.setCreated_groups(req.body);
//   }).catch(error => console.log(error));
// });

// add users to group route
router.post(' /api/group/:groupid/user', (req, res) => {

});

// post message to a group route
router.post('/api/group/:groupid/message', (req, res) => {

});

