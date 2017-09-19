'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var generateSlug = function generateSlug(entity) {
  return entity.id.attributes['im:id'];
};

var iTunesSchema = new _normalizr.Schema('itunes', { idAttribute: generateSlug });

exports.default = iTunesSchema;