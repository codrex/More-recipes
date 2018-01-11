[![Coverage Status](https://coveralls.io/repos/github/codrex/More-recipes/badge.svg?branch=develop)](https://coveralls.io/github/codrex/More-recipes?branch=develop)
[![Build Status](https://travis-ci.org/codrex/More-recipes.svg?branch=develop)](https://travis-ci.org/codrex/More-recipes)
[![Code Climate](https://codeclimate.com/github/codrex/More-recipes/badges/gpa.svg)](https://codeclimate.com/github/codrex/More-recipes)
[![Issue Count](https://codeclimate.com/github/codrex/More-recipes/badges/issue_count.svg)](https://codeclimate.com/github/codrex/More-recipes)

# MORE-RECIPES
 More-Recipes​​ ​provides​ ​a​ ​platform​ ​for​ ​users​ ​to​ ​share​ ​awesome​ ​and​ ​exciting​ ​​ ​recipe​ ​ideas​ ​they  have​ ​invented​ ​or​ ​learnt.​ ​​ ​Suppose​ ​a​ ​user​ ​comes ​up​ ​with​ ​a​ ​recipe,​ ​​ ​he/she​ ​can​ ​post​ ​it​ ​on  More-Recipes​​ ​and​ ​​ ​get​ ​feedback​ ​in​ ​form​ ​of​ ​reviews​ ​and​ ​votes​ ​from​ ​other​ ​users​ ​who​ ​explored​ the ​recipe.​

### API Documentation
You can find the API documentation [here](https://more-recipesrex.herokuapp.com/api/v1/doc/)

### Prerequisites
Before you can run this project locally on your machine here are the applications you need to install on your machine:

1. [ Nodejs 6](https://nodejs.org/en/)
1. [Postgres DB](https://www.postgresql.org/download/)
1. [git](https://git-scm.com/downloads)

### How to install
* **Open a terminal/command prompt** on your computer and cd into your preferred path/location.
* **Clone repo:** to do this, run the following command on your **terminal/command prompt.**
```
git clone https://github.com/codrex/More-recipes.git
```
* **Navigate to the cloned directory**
* **Install dependencies:** To do this, run the following command:
 ```
npm install
```
* **Add the required environment variables:** Locate a file with the filename `.sample.env` in the root directory and copy its content into a different file you will have to create in the root directory of the cloned repo and give it a filename of `.env`. In the `.env` file specify the environmental variables.

* **Initialize database:** Run the following commands:
```
npm run migrate
```

* **Start Server:** Run the following commands:
```
npm start
```
and on your browser navigate to
```
http://localhost:8000/
```
  ## Testing
 This app uses the following for testing: 
  1. `Mocha/Chai` and `supertest` for backend testing.
  1. `Enzyme` and `Jest` for frontend testing
  1. `NightWatch` for End-2-End testing
    
    npm install - run this to download all the project dependencies. That is if you have not do this before.
    npm test:dev - to run test for backend and frontend test
    npm run test:e2e - to run end to end test
  
``Note:`` Before trying to run the end to end test you need to do the following:

  1. [Download Selenium](http://selenium-release.storage.googleapis.com/3.8/selenium-server-standalone-3.8.0.jar)
  1. Download a webdriver, for our case we will be using the [chrome webdriver](https://chromedriver.storage.googleapis.com/index.html?path=2.35/). For more info on how to use other webdriver please vist this [link](http://nightwatchjs.org/gettingstarted#browser-drivers-setup)
  1. Extract the files you just downloaded
  1. Create a folder with the name ``e2eBin``
  in the root directory for the project
  1. Move the extracted files into the ``e2eBin`` folder
  1. You can now run the end to end test command.


## Technologies

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
