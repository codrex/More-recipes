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
   nameUpdate: {
     presence: false,
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
       message: 'username must be at least 3 character',
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
       minimum: 3,
       message: 'must be at least 3 character',
     },
   },
   email: {
     presence: true,
     email: true,
   },
   id: {
     presence: true,
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
   loginWithEmailConstraint: {
     email: objects.email,
     password: objects.password,
   },
   signupConstraint: {
     username: objects.username,
     password: objects.password,
     email: objects.email,
   },
   createRecipeConstraint: {
     recipeName: objects.name,
     category: objects.name,
     ingredients: objects.array,
     directions: objects.array,
     UserId: objects.id,
   },
   idConstraint: {
     id: objects.id,
   },
   recipeUpdateConstraint: {
     recipeName: objects.nameUpdate,
     category: objects.nameUpdate,
     ingredients: objects.array,
     directions: objects.array,
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
       presence: true,
       format: {
         pattern: '[a-zA-Z ]+',
         flags: 'i',
         message: 'can only contain alphabet',
       },
     }
   },
 };

 export default constraint;
