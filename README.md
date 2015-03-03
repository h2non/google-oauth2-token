# google-oauth2-token [![Build Status](https://api.travis-ci.org/h2non/google-oauth2-token.svg?branch=master)][travis]  [![NPM version](https://img.shields.io/npm/v/google-oauth2-token.svg)][npm]

No headaches. Automation wins. Get a fresh OAuth2 token ready to be used for [Google APIs](https://developers.google.com/apis-explorer/) calls in just one command

This package was designed to simplify server-to-server tasks automation and avoid headaches when dealing with OAuth, 
since it the [unique method](https://developers.google.com/youtube/v3/guides/authentication#OAuth2_Flows) to perform most of the write operations via Google APIs

It provides a simple [programmatic](#programmatic-api) and [command-line](#command-line-interface) interface which abstracts you about performing any kind of manual steps related to the authorization and handshake process to obtain a valid OAuth2 token

This uses [PhantomJS](http://phantomjs.org) + [Nightmare](https//gitbub.com/segmentio/nightmare) via [nightmare-google-oauth2](https://github.com/h2non/nightmare-google-oauth2) plugin

## Google API credentials setup

Be sure you have a project and a Web Application credentials with a Client ID and Client Secret 
from the [Google API Console][console] > `API & Auth` > `Credentials`

Then you must add the following URI as allowed redirects (without final slash):
```
http://localhost:8488
```

Then you should see something like:

<img src="http://oi59.tinypic.com/2w3udmd.jpg" />

## Installation

```bash
npm install -g google-oauth2-token
```

## Command-line interface

```bash
$ google-oauth2-token --help

Get Google OAuth2 token.
Usage: google-oauth2-token [options]

Options:
  --help, -h           Show help                                                
  --email, -e          Google Account user email. Available as env variable:
                       GOOGLE_EMAIL                                             
  --password, -p       Google Account user password. Available as env variable:
                       GOOGLE_PASSWORD                                          
  --client-id, -c      Google API Client ID                           [required]
  --client-secret, -x  Google API Client Secret. Available as env variable:
                       GOOGLE_CLIENTSECRET                                      
  --scope, -s          Google API permissions scope                   [required]
  --json, -j           Print tokens to stdout as JSON                           

Examples:
  google-oauth2-token -e user@gmail.com -p myP@ssw0rd 
  --scope https://www.googleapis.com/auth/youtube.upload
  --client-id xxxx ---client-secret xxxx
```

#### Example

```bash
$ GOOGLE_EMAIL=john@gmail.com GOOGLE_PASSWORD=p@s$w0rd google-oauth2-token \
  --client-id xxxx \
  --secret-client xxxx \
  --scope https://www.googleapis.com/auth/youtube \
  --json
```

The above show print something like:
```json
{ 
  "access_token": "H3l5321N123sdI4HLY/RF39FjrCRF39FjrCRF39FjrCRF39FjrC_RF39FjrCRF39FjrC",
  "token_type": "Bearer",
  "refresh_token": "1/smWJksmWJksmWJksmWJksmWJk_smWJksmWJksmWJksmWJksmWJk",
  "expiry_date": 1425333671141 
}
```

## Programmatic API

```js
var GoogleOAuth2 = require('google-oauth2-token')

var params = {
  email: 'my.user@gmail.com',
  password: 'sup3r_p@s$w0rd',
  clientId: 'blablabla', // Google API Client ID
  clientSecret: 'private', // Google API Client Secret
  scope: 'https://www.googleapis.com/auth/youtube.upload'
}

GoogleOAuth2(params, function (err, tokens) {
  if (err) return console.error(err)

  console.log('OAuth2 access token:', tokens.access_token)
  console.log('OAuth2 refresh token:', tokens.refresh_token)
  console.log('OAuth2 token expiry date:', new Date(tokens.expiry_date))
})
```

#### Params

- **email** `required` - Google Account user email. Example: `john@gmail.com`
- **password** `required` - Google Account user password. Be aware with this. Use a temporal environment variable to store it
- **clientId** `required` - Google API Client ID. You can obtain it from the [Google API Console][console]
- **clientSecret** `required` - Google API Client Secret ID. You can obtain it from the [Google API Console][console]
- **scope** `required` - Scope permissions URLs separated by spaces. Read more [here](https://developers.google.com/discovery/v1/using#discovery-doc-methods-scopes)

## License 

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[console]: https://code.google.com/apis/console
[travis]: https://travis-ci.org/h2non/google-oauth2-token
[npm]: http://npmjs.org/package/google-oauth2-token
