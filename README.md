[![Coverage Status](https://coveralls.io/repos/github/codrex/More-recipes/badge.svg?branch=develop)](https://coveralls.io/github/codrex/More-recipes?branch=develop)
[![Build Status](https://travis-ci.org/codrex/More-recipes.svg?branch=develop)](https://travis-ci.org/codrex/More-recipes)
[![Code Climate](https://codeclimate.com/github/codrex/More-recipes/badges/gpa.svg)](https://codeclimate.com/github/codrex/More-recipes)
[![Issue Count](https://codeclimate.com/github/codrex/More-recipes/badges/issue_count.svg)](https://codeclimate.com/github/codrex/More-recipes)

# MORE-RECIPES
 More-Recipes​​ ​provides​ ​a​ ​platform​ ​for​ ​users​ ​to​ ​share​ ​awesome​ ​and​ ​exciting​ ​​ ​recipe​ ​ideas​ ​they  have​ ​invented​ ​or​ ​learnt.​ ​​ ​Suppose​ ​a​ ​user​ ​comes ​up​ ​with​ ​a​ ​recipe,​ ​​ ​he/she​ ​can​ ​post​ ​it​ ​on  More-Recipes​​ ​and​ ​​ ​get​ ​feedback​ ​in​ ​form​ ​of​ ​reviews​ ​and​ ​votes​ ​from​ ​other​ ​users​ ​who​ ​explored​ the ​recipe.​

### API Documentation
You can find the API documentation [here](http://https://more-recipesrex.herokuapp.com/api/v1/doc/)

### Prerequisites
Before you can run this project locally on your machine here are the applications you need to install on your machine:

1. [ Nodejs 6](https://nodejs.org/en/)
1. [Postgres DB](https://www.postgresql.org/download/)
1. [git](https://git-scm.com/downloads)

### How to install 
* **Open a terminal/command prompt** on your computer and cd into your preferred path/location.
* **Clone repo:** to do this, run the following command on your **terminal/command prompt.**
```git clone https://github.com/codrex/More-recipes.git```
* **Navigate to the cloned directory**
* **Install dependencies:** To do this, run the following command: ```npm install```
* **Add the required environment variables:** Locate a file with the filename `.sample.env` in the root directory and copy its content into a different file you will have to create in the root directory of the cloned repo and give it a filename of `.env`. In the `.env` file specify the environmental variables.

* **Initialize the DB:** Run the following commands:
```npm run migrate```

* **Start Server:** Run the following commands:
```npm start```
and on your browser navigate to ```http://localhost:8000/```


### Technologies

-----
This project was built using the following technology:

1. [ Nodejs 6](https://nodejs.org/en/) A JavaScript runtime built on Chrome's V8 JavaScript engine.
1. [Postgres DB](https://www.postgresql.org/download/) An open source object-relational database system.
 1. [Express 4](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js
 1. [Sequelize](http://docs.sequelizejs.com/) A promise-based ORM for Node.js.
 1. [React](https://reactjs.org/) A declarative, efficient, and flexible JavaScript library for building user interfaces.
 1. [Bootstrap 4 beta](https://getbootstrap.com/) An open source toolkit for developing with HTML, CSS, and JS

 ### Contributing

You can send us your bug reports, suggestions, feedback e.t.c by sending us a [mail](mailto:more.recipes.app@gmail.com). we hope to hear from you.
### License

This project is authored by Ogbemudia Rex and it is licensed for your use, modification and distribution under the [MIT license](https://opensource.org/licenses/MIT).
