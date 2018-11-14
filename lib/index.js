(function () {

  'use strict';

  var assign = require('object-assign');
  var isAuthorized = require('./internal/isAuthorized');
  var storyblokTk = require('./internal/storyblokTk');

  var ONE_HOUR_IN_SECONDS = 60 * 60;

  var defaults = {
    previewToken: '',
    maxAge: ONE_HOUR_IN_SECONDS
  };

  function sendUnauthorizedResponse(res) {
    res.status(401).end('UNAUTHORIZED');
  }

  function middlewareWrapper(options) {
    return function previewAuthenticatorMiddleware(req, res, next) {
      var previewAuthenticatorOptions = assign({}, defaults, options);

      if (isAuthorized(req, previewAuthenticatorOptions)) {
        storyblokTk.persistSessionParam(req);
        next();
      } else {
        storyblokTk.clearSessionParam(req);
        sendUnauthorizedResponse(res);
      }
    };
  }

  module.exports = middlewareWrapper;
}());