const express = require('express');
const logger = require('morgan');
const bodyPaser = require('body-parser');
const userController = require('./controllers/usercontroller.js');
const groupController = require('./controllers/groupcontroller.js');
const messageController = require('./controllers/messagecontroller.js');
const association = require('./associations');
const auth = require('./auth/auth');

association.associate();

const app = express();

app.use(logger('dev'));

app.use(bodyPaser.json());

app.use(bodyPaser.urlencoded({ extended: false }));


// registration route
app.post('/api/user/signup', userController.validateSignup);
app.post('/api/user/signup', userController.checkEmailUniqueness);
app.post('/api/user/signup', userController.checkUsernameUniqueness);
app.post('/api/user/signup', userController.signUp);

// login route
app.post('/api/user/signin', userController.login);

// create group route
app.post('/api/group', auth.verifyToken);
app.post('/api/group', groupController.validateGroupData);
app.post('/api/group', groupController.createGroup);
app.post('/api/group', groupController.getGroup);
//  deleteGroup delete a group that was created before an error
// app.post('/api/group', groupController.deleteGroup);


// adding group member
app.post('/api/group/:groupid/user', auth.verifyToken);
app.post('/api/group/:groupid/user', userController.isGroupAdmin);
app.post('/api/group/:groupid/user', userController.isUserValid);
app.post('/api/group/:groupid/user', groupController.alreadyAMember);
app.post('/api/group/:groupid/user', groupController.addMember);


// post message to a group route
app.post('/api/group/:groupid/message', auth.verifyToken);
app.post('/api/group/:groupid/message', groupController.isValidGroup);
app.post('/api/group/:groupid/message', groupController.isGroupMember);
app.post('/api/group/:groupid/message', messageController.validateMessageData);
app.post('/api/group/:groupid/message', messageController.createMessage);
app.post('/api/group/:groupid/message', messageController.getMessage);

// get all members of a  particular groups
app.get('/api/group/:groupid/users', auth.verifyToken);
app.get('/api/group/:groupid/users', userController.validateIds);
app.get('/api/group/:groupid/users', groupController.isGroupMember);
app.get('/api/group/:groupid/users', groupController.getGroupMembers);

// get all admin of a  particular groups
app.get('/api/group/:groupid/admin', auth.verifyToken);
app.get('/api/group/:groupid/admin', userController.validateIds);
app.get('/api/group/:groupid/admin', groupController.isGroupMember);
app.get('/api/group/:groupid/admin', groupController.getGroupAdmin);

// get all groups
app.get('/api/groups', auth.verifyToken);
app.get('/api/groups', groupController.getGroups);

// get a group
app.get('/api/group/:groupid', auth.verifyToken);
app.get('/api/group/:groupid', groupController.validateGroupId);
app.get('/api/group/:groupid', groupController.getGroup);


// get all registered users
app.get('/api/users', auth.verifyToken);
app.get('/api/users', userController.getMembers);

// get all group created by a user
app.get('/api/user/admin/group', auth.verifyToken);
app.get('/api/user/admin/group', userController.getCreatedGroups);

// get all group that a user is member of
app.get('/api/user/member/group', auth.verifyToken);
app.get('/api/user/member/group', userController.getGroupsJoined);


// get all message in group
app.get('/api/group/:groupid/messages', auth.verifyToken);
app.get('/api/group/:groupid/messages', groupController.validateGroupId);
app.get('/api/group/:groupid/messages', groupController.isValidGroup);
app.get('/api/group/:groupid/messages', groupController.isGroupMember);
app.get('/api/group/:groupid/messages', groupController.getMessages);

// editing a message sent to a group
app.put('/api/group/:groupid/message', auth.verifyToken);
app.put('/api/group/:groupid/message', groupController.validateGroupId);
app.put('/api/group/:groupid/message', groupController.isValidGroup);
app.put('/api/group/:groupid/message', messageController.validateEditedMsgData);
app.put('/api/group/:groupid/message', messageController.isSender);
app.put('/api/group/:groupid/message', messageController.editMessage);
app.put('/api/group/:groupid/message', messageController.getMessage);


// deleting a user from a group
app.delete('/api/group/:groupid/user', auth.verifyToken);
app.delete('/api/group/:groupid/user', userController.validateIds);
app.delete('/api/group/:groupid/user', userController.isGroupAdmin);
app.delete('/api/group/:groupid/user', groupController.isGroupMember);
app.delete('/api/group/:groupid/user', groupController.removeMember);
// leaving a group
app.delete('/api/user/member/group', auth.verifyToken);
app.delete('/api/user/member/group', userController.validateIds);
app.delete('/api/user/member/group', groupController.isGroupMember);
app.delete('/api/user/member/group', userController.leaveGroup);

// adding user that have seen a message
// adding an admin to a group

module.exports = app;
