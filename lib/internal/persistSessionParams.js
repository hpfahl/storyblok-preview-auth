(function () {

  'use strict';

  var storyblokTk = require('./storyblokTk');

  function persistSessionParams(req) {
    storyblokTk.setSessionParam(req);
  }

  module.exports = persistSessionParams;
}());
