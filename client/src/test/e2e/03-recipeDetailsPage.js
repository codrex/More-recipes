/* eslint-disable prefer-arrow-callback, func-names */
let user, baseUrl;
module.exports = {
  before(client) {
    user = client.globals.user;
    baseUrl = client.globals.baseUrl;
  },

  'Recipes details page': (client) => {
    client
      .url(`${baseUrl}login`)
      .waitForElementVisible('#modal', 5000)
      .setValue('input#username', user.username)
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(2000)
      .execute(function () {
        document.querySelector('#view-details-btn-0').click();
      })
      .pause(1000)
      .assert.urlContains('/recipe/')
      .moveToElement('.collapse-trigger.a.btn.btn-secondary-outline', 0, 0)
      .execute(function () {
        document
          .querySelector('.collapse-trigger.a.btn.btn-secondary-outline')
          .click();
      })
      .waitForElementVisible('.card-body.accordion-text', 1000)
      .execute(function () {
        document.querySelector('#reviewBtn').click();
      })
      .waitForElementVisible('#modal', 1000)
      .pause(1000)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(1000)
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 1);
      })
      .pause(1000)
      .setValue('#reviewTextarea', 'I love this recipe')
      .pause(1000)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(3000)
      .assert.visible('#toast-container')
      .execute(function () {
        document.querySelector('button.close').click();
      })
      .assert.visible('.media-object.comment')
      .pause(3000)
      .execute(function () {
        document.querySelector('.icon.fa.fa-thumbs-o-up').click();
      })
      .pause(3000)
      .assert.visible('.icon.fa.fa-thumbs-up')
      .assert.visible('.icon.fa.fa-thumbs-o-down')
      .pause(3000)
      .execute(function () {
        document.querySelector('.icon.fa.fa-thumbs-o-down').click();
      })
      .pause(1000)
      .assert.visible('.icon.fa.fa-thumbs-down')
      .assert.visible('.icon.fa.fa-thumbs-o-up')
      .pause(3000)
      .execute(function () {
        document.querySelector('.toast-close-button').click();
        document.querySelector('.icon.fa.fa-heart-o.fav').click();
      })
      .pause(1000)
      .waitForElementVisible('.icon.fa.fa-heart.fav', 3000)
      .assert.visible('.icon.fa.fa-heart.fav');
  },

  'When user attempts to view a non-existent recipe ': (client) => {
    client
      .url(`${baseUrl}recipe/40`)
      .pause(2000)
      .assert.visible('.not-found-text')
      .url(`${baseUrl}recipe/40kkjjkgjf`)
      .pause(2000)
      .assert.visible('.not-found-text')
      .pause(3000)
      .end();
  }
};
