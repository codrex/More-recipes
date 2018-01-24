/* eslint-disable prefer-arrow-callback, func-names */
let user;
module.exports = {
  before(client) {
    user = client.globals.user;
  },

  'Render landing page': (client) => {
    client
      .pause(10000)
      .url('http://localhost:9000')
      .assert.title('MoreRecipes')
      .assert.visible('#login')
      .assert.visible('#signup')
      .assert.visible('#login-nav-link')
      .assert.visible('#create-account-nav-link');
  },
  'user registration': function (client) {
    client
      .url('http://localhost:9000/create-account')
      .waitForElementVisible('#modal', 1000)
      .pause(1000)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 5);
      })
      .setValue('input#username', 'kk')
      .pause(1000)
      .clearValue('input#username')
      .setValue('input#username', user.username)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 4);
      })
      .pause(1000)
      .setValue('input#fullname', 'name')
      .pause(1000)
      .clearValue('input#fullname')
      .setValue('input#fullname', user.name)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 2);
      })
      .pause(1000)
      .setValue('input#email', 'email.com')
      .pause(1000)
      .clearValue('input#email')
      .setValue('input#email', user.email)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 1);
      })
      .pause(1000)
      .pause(1000)
      .setValue('input#password', 'ema')
      .pause(1000)
      .clearValue('input#password')
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 0);
      })
      .pause(1000)
      .assert.urlEquals('http://localhost:9000/recipes')
      .end();
  },
  'user login': function (client) {
    client
      .url('http://localhost:9000/login')
      .waitForElementVisible('#modal', 1000)
      .setValue('input#username', '')
      .setValue('input#password', '')
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 2);
      })
      .pause(1000)
      .clearValue('input#username')
      .clearValue('input#password')
      .pause(1000)
      .setValue('input#username', 'invalid')
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(1000)
      .assert.visible('#toast-container')
      .pause(3000)
      .clearValue('input#username')
      .clearValue('input#password')
      .pause(1000)
      .setValue('input#username', user.username)
      .setValue('input#password', '00000000')
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(1000)
      .assert.visible('#toast-container')
      .pause(3000)
      .clearValue('input#username')
      .clearValue('input#password')
      .pause(1000)
      .setValue('input#username', user.username)
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(1000)
      .assert.urlEquals('http://localhost:9000/recipes')
      .end();
  },
};
