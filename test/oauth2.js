var GoogleOAuth2 = require('../')
var exec = require('child_process').exec
var expect = require('chai').expect

suite('oauth2', function () {
  var SCOPE = 'https://www.googleapis.com/auth/youtube'

  test('exports', function () {
    expect(GoogleOAuth2).to.be.a('function')
  })

  suite('cli', function () {
    var binary = __dirname + '/../bin/google-oauth2-token'

    test('--version', function (done) {
      exec(binary + ' --version', function (err, stdout) {
        expect(stdout).to.match(new RegExp(require('../package.json').version))
        done()
      })
    })

    test('--help', function (done) {
      exec(binary + ' --help', function (err, stdout) {
        expect(stdout).to.match(/show help/i)
        done()
      })
    })

    test('get token using environment variables', function (done) {
      if (process.env.CI) return done()

      var CLIENT_ID = process.env.NIGHTMARE_OAUTH2_CLIENT_ID

      process.env.GOOGLE_EMAIL = process.env.NIGHTMARE_OAUTH2_EMAIL
      process.env.GOOGLE_PASSWORD = process.env.NIGHTMARE_OAUTH2_PASSWORD
      process.env.GOOGLE_CLIENTSECRET = process.env.NIGHTMARE_OAUTH2_CLIENT_SECRET

      exec(binary + ' --client-id ' + CLIENT_ID + ' --scope ' + SCOPE + ' --json',
        function (err, stdout) {
          var tokens = JSON.parse(stdout)
          expect(tokens).to.be.an('object')
          expect(tokens.access_token).to.be.a('string')
          expect(tokens.refresh_token).to.be.a('string')
          expect(tokens.expiry_date).to.be.a('number')
          done()
        })
    })
  })

  suite('api', function () {
    test('get token', function (done) {
      if (process.env.CI) return done()

      var params = {
        email: process.env.NIGHTMARE_OAUTH2_EMAIL,
        password: process.env.NIGHTMARE_OAUTH2_PASSWORD,
        clientId: process.env.NIGHTMARE_OAUTH2_CLIENT_ID,
        clientSecret: process.env.NIGHTMARE_OAUTH2_CLIENT_SECRET,
        scope: SCOPE
      }

      GoogleOAuth2(params, function (err, tokens) {
        expect(err).to.be.null
        expect(tokens).to.be.an('object')
        expect(tokens.access_token).to.be.a('string')
        expect(tokens.refresh_token).to.be.a('string')
        expect(tokens.expiry_date).to.be.a('number')
        done()
      })
    })
  })
})
