(function () {

  'use strict';

  var isEditMode = require('./isEditMode');
  var isValidSession = require('./isValidSession');

  function isAuthorized(req, options) {
    return isEditMode(req, options) && isValidSession(req, options);
  }

  module.exports = isAuthorized;
}());