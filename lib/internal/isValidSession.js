(function () {

  'use strict';

  var storyblokTk = require('./storyblokTk');

  function isValidSession(req, options) {
    var timestamp = parseInt(storyblokTk.getTimestamp(req), 10);
    return timestamp > Math.floor(Date.now() / 1000) - options.maxAge;
  }

  module.exports = isValidSession;
}());
