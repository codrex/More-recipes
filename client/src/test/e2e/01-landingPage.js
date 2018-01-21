/* eslint-disable prefer-arrow-callback, func-names */
let user;
module.exports = {
  before(client) {
    user = client.globals.user;
  },

  'Render landing page': (client) => {
    client
      .pause(20000)
      .url('http://localhost:9000')
      .assert.title('MoreRecipes')
      .assert.visible('#login')
      .assert.visible('#signup')
      .assert.visible('#login-nav-link')
      .assert.visible('#create-account-nav-link');
  },
  'navigate to the login page': function (client) {
    client
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .execute(function () {
        document.querySelector('#login').click();
      })
      .assert.urlEquals('http://localhost:9000/login')
      .pause(500)
      .execute(function () {
        document.querySelector('.close').click();
      })
      .assert.urlEquals('http://localhost:9000/')
      .pause(500)
      .execute(function () {
        document.querySelector('#login').click();
      })
      .assert.urlEquals('http://localhost:9000/login')
      .end();
  },
  'user attempt to submit an empty form': function (client) {
    client
      .url('http://localhost:9000/login')
      .waitForElementVisible('#modal', 1000)
      .setValue('input#username', '')
      .setValue('input#password', '')
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .assert.visible('.help-text')
      .pause(500)
      .end();
  },
  'user attempt to login with an invalid credential': function (client) {
    client
      .url('http://localhost:9000/login')
      .waitForElementVisible('#modal', 2000)
      .setValue('input#username', 'invalid')
      .setValue('input#password', '00000000')
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(1000)
      .assert.visible('#toast-container')
      .end();
  },
  'user navigates to the signup page via the login form': function (client) {
    client
      .url('http://localhost:9000/login')
      .waitForElementVisible('#modal', 30000)
      .execute(function () {
        document.querySelector('span[role="button"]').click();
      })
      .pause(1000)
      .assert.containsText('#modalLabel', 'Create An Account')
      .end();
  },
  'user navigates to the signup page and registers': function (client) {
    client
      .url('http://localhost:9000/create-account')
      .waitForElementVisible('#modal', 1000)
      .setValue('input#username', user.username)
      .setValue('input#fullname', user.name)
      .setValue('input#email', user.email)
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(1000)
      .assert.urlEquals('http://localhost:9000/recipes')
      .end();
  },
  'user login with valid credentials': function (client) {
    client
      .url('http://localhost:9000/login')
      .waitForElementVisible('#modal', 1000)
      .setValue('input#username', user.username)
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(1000)
      .assert.urlEquals('http://localhost:9000/recipes')
      .end();
  }
};
