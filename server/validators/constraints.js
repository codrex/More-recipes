 const objects = {
   name: {
     presence: true,
     format: {
       pattern: '[a-zA-Z ]+',
       flags: 'i',
       message: 'can only contain alphabet',
     },
     length: {
       minimum: 2,
       message: 'must be at least 2 character',
     },
   },
   password: {
     presence: true,
     length: {
       minimum: 6,
       message: 'must be at least 6 character',
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
       minimum: 3,
       message: ' must be at least 3 character',
     },
   },
   fullname: {
     presence: true,
     words: true,
     format: {
       pattern: '[a-zA-Z ]+',
       flags: 'i',
       message: 'can only contain alphabet',
     },
   },
   email: {
     presence: true,
     email: true,
   },
   id: {
     presence: {
       message: 'sent is invalid'
     },
     numericality: {
       onlyInteger: true,
       greaterThan: 0,
     },
   },
   array: {
     stringArray: true,
   },
 };

 const constraint = {
   loginWithUsernameConstraint: {
     username: objects.username,
     password: objects.password,
   },
   signupConstraint: {
     username: objects.username,
     password: objects.password,
     email: objects.email,
     fullname: objects.fullname,
   },
   profileUpdateConstraint: {
     username: objects.username,
     email: objects.email,
     fullname: objects.fullname,
   },
   createRecipeConstraint: {
     name: objects.name,
     category: objects.name,
     ingredients: objects.array,
     directions: objects.array,
     OwnerId: objects.id,
   },
   idConstraint: {
     id: objects.id,
   },
   reviewConstraint: {
     review: {
       presence: true,
       length: {
         minimum: 2,
         message: 'must be at least 2 character',
       },
     },
   },
   voteConstraint: {
     id: objects.id,
     vote: {
       presence: {
         message: 'parameter is invalid, only true or false is allowed'
       },
       format: {
         pattern: '(true|false)$',
         flags: 'i',
         message: 'parameter is invalid, only true or false is allowed',
       },
     }
   },
 };

 export default constraint;
