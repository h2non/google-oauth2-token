var Nightmare = require('nightmare')
var NightmareOAuth2 = require('nightmare-google-oauth2')

module.exports = function (params, callback) {
  new Nightmare()
    .use(NightmareOAuth2.getToken(params, callback))
    .run(function (err) {
      if (err) callback(err)
    })
}
