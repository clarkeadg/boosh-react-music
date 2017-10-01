'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArtistByTitle = exports.getArtistById = exports.getVisibleArtists = exports.getArtistsCollection = exports.getArtistTitle = undefined;

var _reselect = require('reselect');

/* Private */

var allArtists = function allArtists(state, props) {
  return state.artists;
};

var artistId = function artistId(state, props) {
  return props.artist_id;
};

var artistTitle = function artistTitle(state, props) {
  return props.routeParams.artistTitle || '';
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'artists';
};

/* Exports */

var getArtistTitle = exports.getArtistTitle = (0, _reselect.createSelector)([artistTitle], function (title) {
  return title;
});

var getArtistsCollection = exports.getArtistsCollection = (0, _reselect.createSelector)([allArtists, path], function (artists, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!artists.collections[key]) return collection;
  collection.count = artists.collections[key].count;
  collection.items = artists.collections[key].result.map(function (id) {
    return artists.entities[id];
  });
  return collection;
});

var getVisibleArtists = exports.getVisibleArtists = (0, _reselect.createSelector)([allArtists], function (artists) {
  return artists.result.map(function (id) {
    return artists.entities[id];
  });
});

var getArtistById = exports.getArtistById = (0, _reselect.createSelector)([allArtists, artistId], function (artists, id) {
  return artists.entities[id];
});

var getArtistByTitle = exports.getArtistByTitle = (0, _reselect.createSelector)([allArtists, artistTitle], function (artists, title) {
  for (var id in artists.entities) {
    if (artists.entities[id].title == title) {
      return artists.entities[id];
    }
  }
  return null;
});