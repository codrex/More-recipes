/* eslint-disable prefer-arrow-callback, func-names */

let user, baseUrl;
module.exports = {
  before(client) {
    user = client.globals.user;
    baseUrl = client.globals.baseUrl;
  },

  'Render add recipe page': (client) => {
    client
      .url(`${baseUrl}login`)
      .waitForElementVisible('#modal', 5000)
      .setValue('input#username', user.username)
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(2000)
      .url(`${baseUrl}create`)
      .waitForElementVisible('#recipe-editor', 3000)
      .execute(function () {
        document.querySelector('.add-recipe-btn').click();
      })
      .pause(1000)
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 5);
      });
  },

  'Post a recipe': (client) => {
    client
      .setValue('input#recipeName', 'e')
      .pause(1000)
      .execute(function () {
        document.querySelector('.add-recipe-btn').focus();
      })
      .pause(1000)
      .elements('css selector', '.help-text', function (result) {
        this.assert.equal(result.value.length, 4);
      })
      .setValue('input#recipeName', user.username)
      .setValue('.Select-input input', 'lunch')
      .click('.Select-option')
      .pause(1000)
      .setValue('input#ingredient', 'd')
      .click('#ingredient-submit-btn')
      .clearValue('input#ingredient')
      .pause(1000)
      .setValue('input#ingredient', '1/2 cup butter, melted')
      .click('#ingredient-submit-btn')
      .pause(1000)
      .clearValue('input#ingredient')
      .setValue('input#ingredient', '1 cup of white sugar')
      .click('#ingredient-submit-btn')
      .pause(1000)
      .clearValue('input#ingredient')
      .setValue('input#ingredient', '2 eggs')
      .click('#ingredient-submit-btn')
      .pause(1000)
      .clearValue('input#ingredient')
      .setValue('input#ingredient', '2 eggs')
      .click('#ingredient-submit-btn')
      .pause(1000)
      .clearValue('input#ingredient')
      .setValue('input#ingredient', '1 teaspoon vanilla extract')
      .click('#ingredient-submit-btn')
      .pause(1000)
      .execute(function () {
        document
          .querySelector('.icon.fa.fa-pencil.items-list-item-icon.icon')
          .click();
      })
      .pause(1000)
      .clearValue('input.form-control.text-input.item-edit-input.invalid')
      .setValue('input.form-control.text-input.item-edit-input.invalid',
        '1 teaspoon baking soda')
      .pause(1000)
      .execute(function () {
        document.querySelector('.btn.btn-secondary.text-white.item-edit-btn')
          .click();
      })
      .pause(1000)
      .setValue('#directionTextarea', '1 cup of white sugar')
      .click('#direction-submit-btn')
      .pause(1000)
      .clearValue('#directionTextarea')
      .setValue('#directionTextarea', '2 eggs')
      .click('#direction-submit-btn')
      .pause(1000)
      .clearValue('#directionTextarea')
      .setValue('#directionTextarea', '2 eggs')
      .click('#direction-submit-btn')
      .pause(1000)
      .clearValue('#directionTextarea')
      .setValue('#directionTextarea', '1 teaspoon vanilla extract')
      .click('#direction-submit-btn')
      .execute(function () {
        document
          .querySelector('.icon.fa.fa-trash.items-list-item-icon.icon').click();
      })
      .pause(500)
      .execute(function () {
        document.querySelector('.add-recipe-btn').click();
      })
      .pause(3000)
      .assert.urlContains('/recipe/');
  },

  'When user attempts to create recipe with an existing recipe name':
  (client) => {
    client
      .back()
      .pause(2000)
      .assert.urlContains('/create')
      .pause(1000)
      .setValue('input#recipeName', user.username)
      .setValue('.Select-input input', 'lunch')
      .click('.Select-option')
      .pause(1000)
      .setValue('#directionTextarea', '1 cup of white sugar')
      .click('#direction-submit-btn')
      .pause(1000)
      .setValue('input#ingredient', '1/2 cup butter, melted')
      .click('#ingredient-submit-btn')
      .pause(1000)
      .execute(function () {
        document.querySelector('.add-recipe-btn').click();
      })
      .pause(1000)
      .assert.visible('#toast-container')
      .end();
  },
  'Modify recipe': (client) => {
    client
      .url(`${baseUrl}login`)
      .waitForElementVisible('#modal', 5000)
      .setValue('input#username', user.username)
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click();
      })
      .pause(2000)
      .url(`${baseUrl}modify/1`)
      .pause(3000)
      .execute(function () {
        document
          .querySelector('.icon.fa.fa-pencil.items-list-item-icon.icon')
          .click();
      })
      .clearValue('input.form-control.text-input.item-edit-input.invalid')
      .pause(1000)
      .setValue('input.form-control.text-input.item-edit-input.invalid',
        '10 teaspoon baking soda')
      .execute(function () {
        document.querySelector('.btn.btn-secondary.text-white.item-edit-btn')
          .click();
      })
      .pause(1000)
      .assert.containsText('.list-item-text.lead', '10 Teaspoon Baking Soda')
      .execute(function () {
        document.querySelector('.add-recipe-btn').click();
      })
      .pause(3000)
      .assert.urlContains('/recipe/');
  },
  'When user attempts to modify a non-existent recipe ': (client) => {
    client
      .url(`${baseUrl}modify/400`)
      .pause(1000)
      .assert.visible('.not-found-text')
      .pause(1000)
      .url(`${baseUrl}modify/40kkjjkgjf`)
      .pause(1000)
      .assert.visible('.not-found-text')
      .pause(1000)
      .end();
  }
};
