(function () {

  'use strict';

  var crypto = require('crypto');
  var storyblokTk = require('./storyblokTk');

  function _buildControlToken(req, options) {
    var spaceId = storyblokTk.getSpaceId(req);
    var timestamp = storyblokTk.getTimestamp(req);
    var previewToken = options.previewToken;
    if (!spaceId || !timestamp || !previewToken) return;

    return crypto.createHash('sha1').update(spaceId + ':' + previewToken + ':' + timestamp).digest('hex');
  }

  function isEditMode(req, options) {
    var controlToken = _buildControlToken(req, options);
    var token = storyblokTk.getToken(req);
    if (!token || !controlToken) return false;

    return token === controlToken;
  }

  module.exports = isEditMode;
}());
