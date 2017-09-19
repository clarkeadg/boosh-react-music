"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoTitle = exports.getVisibleYoutube = undefined;

var _reselect = require("reselect");

/* Private */

var allYoutubes = function allYoutubes(state, props) {
  return state.youtube;
};

var videoTitle = function videoTitle(state, props) {
  return props.routeParams.videoTitle || "";
};

/* Export */

var getVisibleYoutube = exports.getVisibleYoutube = (0, _reselect.createSelector)([allYoutubes], function (youtubes) {
  if (!youtubes) return {};
  if (!youtubes.entities) return {};
  if (!youtubes.result) return {};
  return youtubes.entities[youtubes.result[0]];
  /*return youtubes.result.map((id) => {
    return youtubes.entities[id]
  })*/
});

var getVideoTitle = exports.getVideoTitle = (0, _reselect.createSelector)([videoTitle], function (title) {
  return title;
});