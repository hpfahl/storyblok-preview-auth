# storyblok-preview-auth
 storyblok-preview-auth is a node.js package for providing a [Connect](http://www.senchalabs.org/connect/)/[Express](http://expressjs.com/) middleware to securely validate if the user is in [Storyblok](https://www.storyblok.com) edit mode

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install storyblok-preview-auth
```

## API

```js
var previewAuthenticator = require('storyblok-preview-auth')
```

### previewAuthenticator(options)

Create a previewAuthenticator middleware with the given `options`.

The user is authenticated based on `_storyblok_tk[token]` url parameter as described [here](https://www.storyblok.com/docs/Guides/storyblok-latest-js#how-to-validate-if-the-user-is-viewing-your-site-in-the-storyblo).
If authentication fails, previewAuthenticator middleware will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked. If authentication succeeds, the next handler will be invoked and the _storyblok_tk property will be set in `req.session` to authenticate subsequent requests.

#### Options

`storyblok-preview-auth` accepts these properties in the options object.

##### previewToken

Your preview token. This token allows you to access the draft and published version of your content and can be generated in the Storyblok dashboard at app.storyblok.com.

##### maxAge

A number representing the seconds from `Date.now()` for expiry. previewAuthenticator middleware will respond with a 401 Unauthorized status if timestamp provided as `_storyblok_tk[timestamp]` query parameter is older than maxAge. (1 hour by default)

## Usage
A simple example using `storyblok-preview-auth` to securely validate if the user is in edit mode.

```js
var express = require('express')
var session = require('cookie-session')
var previewAuthenticator = require('storyblok-preview-auth')

var app = express()

app.use(session())

app.use(previewAuthenticator({
  previewToken: 'YOUR_PREVIEW_TOKEN',
  maxAge: 1 * 60 * 60 // 1 hour
}))

app.use(...) // Will be invoked only if in edit mode

app.listen(3000);
```

## Todo

- [ ] Tests

## License

[MIT](LICENSE)
