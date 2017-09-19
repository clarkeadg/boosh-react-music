'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ARTISTS */
var getArtistsAttempt = function getArtistsAttempt(meta) {
  return { type: _Types2.default.GET_ARTISTS_REQUEST, meta: meta };
};
var getArtistsSuccess = function getArtistsSuccess(payload) {
  return { type: _Types2.default.GET_ARTISTS_SUCCESS, payload: payload };
};
var getArtistsFailure = function getArtistsFailure(errorCode) {
  return { type: _Types2.default.GET_ARTISTS_FAILURE, errorCode: errorCode };
};

/* MUSIC */
var getMusicAttempt = function getMusicAttempt(meta) {
  return { type: _Types2.default.GET_MUSIC_REQUEST, meta: meta };
};
var getMusicSuccess = function getMusicSuccess(payload) {
  return { type: _Types2.default.GET_MUSIC_SUCCESS, payload: payload };
};
var getMusicFailure = function getMusicFailure(errorCode) {
  return { type: _Types2.default.GET_MUSIC_FAILURE, errorCode: errorCode };
};

/* ITUNES */
var getItunesAttempt = function getItunesAttempt(meta) {
  return { type: _Types2.default.GET_ITUNES_REQUEST, meta: meta };
};
var getItunesSuccess = function getItunesSuccess(payload) {
  return { type: _Types2.default.GET_ITUNES_SUCCESS, payload: payload };
};
var getItunesFailure = function getItunesFailure(errorCode) {
  return { type: _Types2.default.GET_ITUNES_FAILURE, errorCode: errorCode };
};

/* YOUTUBE */
var getYouTubeAttempt = function getYouTubeAttempt(meta) {
  return { type: _Types2.default.GET_YOUTUBE_REQUEST, meta: meta };
};
var getYouTubeSuccess = function getYouTubeSuccess(payload) {
  return { type: _Types2.default.GET_YOUTUBE_SUCCESS, payload: payload };
};
var getYouTubeFailure = function getYouTubeFailure(errorCode) {
  return { type: _Types2.default.GET_YOUTUBE_FAILURE, errorCode: errorCode };
};

/**
 Makes available all the action creators we've created.
 */
exports.default = {

  getArtistsAttempt: getArtistsAttempt,
  getArtistsSuccess: getArtistsSuccess,
  getArtistsFailure: getArtistsFailure,

  getMusicAttempt: getMusicAttempt,
  getMusicSuccess: getMusicSuccess,
  getMusicFailure: getMusicFailure,

  getItunesAttempt: getItunesAttempt,
  getItunesSuccess: getItunesSuccess,
  getItunesFailure: getItunesFailure,

  getYouTubeAttempt: getYouTubeAttempt,
  getYouTubeSuccess: getYouTubeSuccess,
  getYouTubeFailure: getYouTubeFailure
};