'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var MusicSchema = new _normalizr.Schema('music', { idAttribute: 'id' });

exports.default = MusicSchema;