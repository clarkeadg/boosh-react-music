'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var ArtistSchema = new _normalizr.Schema('artist', { idAttribute: 'id' });

exports.default = ArtistSchema;