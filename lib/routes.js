'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _List = require('./Containers/List');

var _List2 = _interopRequireDefault(_List);

var _Video = require('./Containers/Video');

var _Video2 = _interopRequireDefault(_Video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/music' },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _List2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: ':filter', component: _List2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'video/:videoTitle', component: _Video2.default })
  );
  return routes;
};