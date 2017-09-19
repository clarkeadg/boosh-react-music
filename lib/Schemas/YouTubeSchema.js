'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var generateSlug = function generateSlug(entity) {
  return entity.id.videoId;
};

var YouTubeSchema = new _normalizr.Schema('youtube', { idAttribute: generateSlug });

exports.default = YouTubeSchema;