# google-oauth2-token [![NPM version](https://img.shields.io/npm/v/google-oauth2-token.svg)][npm]

No headaches. Automation wins. Get a fresh OAuth2 token ready to be used for Google APIs calls

This package was designed to simplify server-to-server tasks automation and avoid headaches when dealing with OAuth, 
since it the [unique method](https://developers.google.com/youtube/v3/guides/authentication#OAuth2_Flows) to perform most of the write operations via Google APIs

It provides a simple [command-line](#command-line-interface) interface which abstracts you about performing any kind of manual steps related to the authorization and handshake process to obtain a valid OAuth2 token

For programmatic usage, see [nightmare-google-oauth2](https://github.com/h2non/nightmare-google-oauth2) package

## Installation

```bash
npm install -g google-oauth2-token
```

## Usage

```bash
$ google-oauth2-token --help

Get Google OAuth2 token.
Usage: node bin/google-oauth2-token [options]

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

## Google API credentials setup

Be sure you have a project and a Web Application credentials with a Client ID and Client Secret 
from the [Google API Console][console] > `API & Auth` > `Credentials`

Then you must add the following URI as allowed redirects (without final slash):
```
http://localhost:8488
```

Then you should see something like:

<img src="http://oi59.tinypic.com/2w3udmd.jpg" />

## License 

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[console]: https://code.google.com/apis/console
[travis]: https://travis-ci.org/h2non/google-oauth2-token
[npm]: http://npmjs.org/package/google-oauth2-token
