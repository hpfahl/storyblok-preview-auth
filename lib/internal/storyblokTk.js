(function () {

  'use strict';

  function _getParamsFromUrl(req) {
    return (req && req.query) ? req.query._storyblok_tk : undefined;
  }

  function _getParamsFromSession(req) {
    return (req && req.session) ? req.session._storyblok_tk : undefined;
  }

  function _getParams(req) {
    var params = _getParamsFromUrl(req);
    return params ? params : _getParamsFromSession(req);
  }

  function _getParamByName(req, name) {
    var params = _getParams(req);
    if (!params) return;

    return params[name];
  }

  function _setSessionParam(req) {
    if (!req.session._storyblok_tk) {
      req.session._storyblok_tk = _getParams(req);
    }
  }

  function _removeSessionParam(req) {
    req.session = null;
  }

  function getTimestamp(req) {
    return _getParamByName(req, 'timestamp');
  }

  function getSpaceId(req) {
    return _getParamByName(req, 'space_id');
  }

  function getToken(req) {
    return _getParamByName(req, 'token');
  }

  function persistSessionParam(req) {
    _setSessionParam(req);
  }

  function clearSessionParam(req) {
    _removeSessionParam(req);
  }

  module.exports.getTimestamp = getTimestamp;
  module.exports.getSpaceId = getSpaceId;
  module.exports.getToken = getToken;
  module.exports.persistSessionParam = persistSessionParam;
  module.exports.clearSessionParam = clearSessionParam;
}());
