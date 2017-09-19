'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_STATE = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ACTION_HANDLERS;

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2.default)({
  entities: {},
  result: [],
  fetching: null,
  error: null
});

// request
var request = function request(state, action) {
  return state.merge({
    fetching: true
  });
};

// receive
var receive = function receive(state, action) {
  return state.merge({
    fetching: false,
    error: null,
    entities: state.entities.merge(action.payload.entities.youtube),
    result: action.payload.result
  });
};

// failure
var failure = function failure(state, action) {
  return state.merge({
    fetching: false,
    error: true,
    data: null
  });
};

// map our types to our handlers
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_YOUTUBE_REQUEST, request), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_YOUTUBE_SUCCESS, receive), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_YOUTUBE_FAILURE, failure), _ACTION_HANDLERS);

exports.default = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);