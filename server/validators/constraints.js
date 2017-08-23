 const objects = {
   password: {
     presence: true,
     length: {
       minimum: 6,
       message: 'password must be at least 6 character',
     },
   },
   username: {
     presence: true,
     noSpace: true,
     format: {
       pattern: '[a-z0-9A-Z_]+',
       flags: 'i',
       message: 'can only contain alphabet, number and underscore',
     },
     length: {
       minimum: 2,
       message: 'username must be at least 2 character',
     },
   },
   fullname: {
     presence: true,
     atLeastTwoWord: true,
     format: {
       pattern: '[a-zA-Z ]+',
       flags: 'i',
       message: 'can only contain alphabet',
     },
     length: {
       minimum: 2,
       message: 'fullname must be at least 2 character',
     },
   },
   email: {
     presence: true,
     email: true,
     length: {
       minimum: 2,
       message: 'username must be at least 2 character',
     },
   },
   id: {
     presence: true,
     numericality: {
       onlyInteger: true,
       greaterThan: 0,
     },
   },
   content: {
     presence: {
       message: 'can not be empty',
     },
     length: {
       minimum: 1,
       message: 'Message can not be empty',
     },
   },
 };
 const constraint = {
   loginWithUsernameConstraint: {
     username: objects.username,
     password: objects.password,
   },
   loginWithEmailConstraint: {
     email: objects.email,
     password: objects.password,
   },
   signupConstraint: {
     username: objects.username,
     password: objects.password,
     fullname: objects.fullname,
     email: objects.email,
   },
   createGroupConstraint: {
     name: {
       presence: true,
       length: {
         minimum: 2,
         message: 'group name must be at least 2 character',
       },
     },
     about: {},
   },

   messageConstraint: {
     content: objects.content,
     senderId: objects.id,
     groupId: objects.id,
     priority: {
       numericality: {
         onlyInteger: true,
         greaterThan: 0,
         lessThanOrEqualTo: 3,
       } },
   },
   addMemberConstraint: {
     MemberId: objects.id,
     GroupId: objects.id,
   },
   idConstraint: {
     id: objects.id,
   },
   editMsg: {
     content: objects.content,
     messageId: objects.id,
   },
 };

 module.exports = constraint;
