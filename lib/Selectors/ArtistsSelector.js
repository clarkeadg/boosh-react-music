'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArtistById = exports.getVisibleArtists = exports.getArtistsCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allArtists = function allArtists(state, props) {
  return state.artists;
};

var artistId = function artistId(state, props) {
  return props.artist_id;
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'artists';
};

/* Exports */

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