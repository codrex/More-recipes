var user, baseUrl;
module.exports = {
  before : function(client) {
    user = client.globals.user;
    baseUrl = client.globals.baseUrl;
    console.log(baseUrl)
  },

  'Render recipes page': (client) => {
    client
      .url(baseUrl + 'login')
      .waitForElementVisible('#modal', 5000)
      .setValue('input#username', user.username)
      .setValue('input#password', user.password)
      .execute(function () {
        document.querySelector('#submit').click()
      })
      .pause(2000)
      .execute(function () {
        document.querySelector('#view-details-btn-0').click()
      })
},
  'Edit user profile': (client) => {
    client
      .url(baseUrl + 'user')
      .assert.urlEquals(baseUrl + 'user')
      .waitForElementVisible('.avatar.avatar-md',2000 )
      .assert.visible('.btn.btn-lg.center-margin.edit-btn.btn-secondary')
      .execute(function () {
        document.querySelector('.btn.btn-lg.center-margin.edit-btn.btn-secondary').click()
      })
      .waitForElementVisible('#modal', 2000)
      .clearValue('#fullname')
      .setValue('#fullname','test name')
      .execute(function () {
        document.querySelector('#submit').click()
      })
      .pause(3000)
      .assert.visible('#toast-container')
      .execute(function () {
        document.querySelector('button.close').click()
      })
      .assert.containsText(".fullname-text", "Test Name")
      .end()
  }


};
