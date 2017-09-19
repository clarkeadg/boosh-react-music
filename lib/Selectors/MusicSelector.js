'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMusicByTitle = exports.getMusicById = exports.getVisibleMusic = exports.getVideoById = exports.getMusicCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allMusic = function allMusic(state, props) {
  return state.music;
};

var musicId = function musicId(state, props) {
  return props.music_id;
};

var videoId = function videoId(state, props) {
  return props.video_id;
};

var videoTitle = function videoTitle(state, props) {
  return props.routeParams.videoTitle || '';
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'music';
};

/* Exports */

var getMusicCollection = exports.getMusicCollection = (0, _reselect.createSelector)([allMusic, path], function (music, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!music.collections[key]) return collection;
  collection.count = music.collections[key].count;
  collection.items = music.collections[key].result.map(function (id) {
    return music.entities[id];
  });
  return collection;
});

var getVideoById = exports.getVideoById = (0, _reselect.createSelector)([allMusic, videoId], function (music, title) {
  for (var id in music.entities) {
    if (music.entities[id].title == title) {
      return music.entities[id];
    }
  }
  return null;
});

var getVisibleMusic = exports.getVisibleMusic = (0, _reselect.createSelector)([allMusic], function (music) {
  return music.result.map(function (id) {
    return music.entities[id];
  });
});

var getMusicById = exports.getMusicById = (0, _reselect.createSelector)([allMusic, musicId], function (music, id) {
  return music.entities[id];
});

var getMusicByTitle = exports.getMusicByTitle = (0, _reselect.createSelector)([allMusic, videoTitle], function (music, title) {
  for (var id in music.entities) {
    if (music.entities[id].title == title) {
      return music.entities[id];
    }
  }
  return null;
});