/* eslint-disable prefer-arrow-callback, func-names */

let user, baseUrl;
module.exports = {
  before(client) {
    user = client.globals.user;
    baseUrl = client.globals.baseUrl;
  },

  'Recipes display page': (client) => {
    client
      .url(`${baseUrl}login`)
      .waitForElementVisible('#modal', 5000)
      .setValue('input#username', user.username)
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .waitForElementVisible('body', 1000)
      .assert.title('MoreRecipes')
      .pause(1000)
      .assert.visible('#topbar')
      .assert.visible('#Recipes-nav-link')
      .assert.visible('#Top-Recipes-nav-link')
      .assert.visible('#Add-Recipe-nav-link')
      .assert.visible('#searchbox')
      .assert.visible('.grid')
      .assert.containsText('#display-1', 'Recipes')
      .execute(function () {
        document.querySelector('#Add-Recipe-nav-link>a').click();
      })
      .pause(1000)
      .assert.urlEquals(`${baseUrl}create`)
      .execute(function () {
        document.querySelector('#Top-Recipes-nav-link>a').click();
      })
      .pause(1000)
      .assert.urlEquals(`${baseUrl}top-recipes`)
      .execute(function () {
        document.querySelector('#Recipes-nav-link>a').click();
      })
      .pause(1000)
      .assert.urlEquals(`${baseUrl}recipes`)
      .setValue('input[type=search]', 'coconut rice')
      .pause(3000)
      .assert.containsText('#display-1', 'Recipes')
      .execute(function () {
        document.querySelector('#dropdown>div').click();
      })
      .pause(1000)
      .waitForElementVisible('ul.dropdown-menu', 1000)
      .execute(function () {
        document.querySelector('#profile-menu>div').click();
      })
      .pause(1000)
      .assert.urlEquals(`${baseUrl}user`)
      .execute(function () {
        document.querySelector('#dropdown>div').click();
      })
      .pause(500)
      .execute(function () {
        document.querySelector('#favourite-recipes-menu>div').click();
      })
      .pause(1000)
      .assert.urlEquals(`${baseUrl}favourite-recipes`)
      .execute(function () {
        document.querySelector('#dropdown>div').click();
      })
      .pause(1000)
      .execute(function () {
        document.querySelector('#created-recipes-menu>div').click();
      })
      .pause(1000)
      .assert.urlEquals(`${baseUrl}created-recipes`)
      .pause(1000)
      .execute(function () {
        document.querySelector('#Recipes-nav-link>a').click();
      })
      .pause(1000)
      .execute(function () {
        document.querySelector('#view-details-btn-0').click();
      })
      .pause(1000)
      .assert.urlContains('/recipe/')
      .end();
  }
};
