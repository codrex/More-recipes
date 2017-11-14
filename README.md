[![Coverage Status](https://coveralls.io/repos/github/codrex/More-recipes/badge.svg?branch=develop)](https://coveralls.io/github/codrex/More-recipes?branch=develop)
[![Build Status](https://travis-ci.org/codrex/More-recipes.svg?branch=develop)](https://travis-ci.org/codrex/More-recipes)
[![Code Climate](https://codeclimate.com/github/codrex/More-recipes/badges/gpa.svg)](https://codeclimate.com/github/codrex/More-recipes)
[![Issue Count](https://codeclimate.com/github/codrex/More-recipes/badges/issue_count.svg)](https://codeclimate.com/github/codrex/More-recipes)

# MORE-RECIPES
 More-Recipes​​ ​provides​ ​a​ ​platform​ ​for​ ​users​ ​to​ ​share​ ​awesome​ ​and​ ​exciting​ ​​ ​recipe​ ​ideas​ ​they  have​ ​invented​ ​or​ ​learnt.​ ​​ ​Suppose​ ​a​ ​user​ ​comes ​up​ ​with​ ​a​ ​recipe,​ ​​ ​he/she​ ​can​ ​post​ ​it​ ​on  More-Recipes​​ ​and​ ​​ ​get​ ​feedback​ ​in​ ​form​ ​of​ ​reviews​ ​and​ ​votes​ ​from​ ​other​ ​users​ ​who​ ​explored​ the ​recipe.​

## Endpoints

- **<code>POST</code>:/api/v1/users/signup**
  - Creates a new user
- **<code>POST</code>:/api/v1/users/signin**
  - Registered users can login and get an access token
- **<code>POST</code>:/api/v1/recipes**
  - Allows a registered user to create a recipe 
- **<code>PUT</code>:/api/v1/recipes/:recipeid**
  - Allows a registered user to modify a recipe he/she created
- **<code>DELETE</code>:/api/v1/recipes/:recipeid**
  - Allows a registered user to delete a recipe he/she created
- **<code>GET</code>:/api/v1/recipes**
  - Returns all the recipes in the application
- **<code>POST</code>:/api/recipes/:recipeid/reviews**
  - Allows registered users post reviews on a recipe
- **<code>POST</code>:api/v1/users/recipes**
  - Registered user can favorite a recipe
- **<code>GET</code>:/api/users/recipes**
  - Registered user can get his/her favorite recipes
- **<code>PUT</code>:/api/v1/recipes/:recipeid/vote?vote={votetype}**
  - Registered users can either upvote or downvote a recipe
- **<code>GET</code>:/api/v1/recipes?sort={upvotes}&order={ascending}**
  - Registered users can get recipes with the most upvotes
- **<code>GET</code>:/api/v1/recipes?search={search}**
  - Registered users can search for recipes either by recipe name or by recipe category

### For more info [read our API documentation](http://docs.morerecipes.apiary.io)

### Technologies

-----

 1. Nodejs 7
 1. Postgres
 1. Express 4
 1. Sequelize ORM
 1. JWT
 1. React/Redux, SASS ,CSS



 
