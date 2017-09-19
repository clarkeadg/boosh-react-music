'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _booshReactPagination = require('boosh-react-pagination');

var _MusicSchema = require('../Schemas/MusicSchema');

var _MusicSchema2 = _interopRequireDefault(_MusicSchema);

var _ArtistSchema = require('../Schemas/ArtistSchema');

var _ArtistSchema2 = _interopRequireDefault(_ArtistSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* SCHEMAS */
exports.default = function (api) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(attemptGetMusic),
      _marked2 = /*#__PURE__*/_regenerator2.default.mark(attemptArtists),
      _marked3 = /*#__PURE__*/_regenerator2.default.mark(watchGetMusicAttempt),
      _marked4 = /*#__PURE__*/_regenerator2.default.mark(watchGetArtistsAttempt);

  function attemptGetMusic(meta) {
    var query, path, response, data, count, payload;
    return _regenerator2.default.wrap(function attemptGetMusic$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // for takeEvery
            meta = meta.meta;

            // for new pagination
            query = meta.query ? meta.query : meta;
            path = meta.path ? meta.path : "/music/";

            // make the call to the api

            _context.next = 5;
            return (0, _effects.call)(api.getMusic, query);

          case 5:
            response = _context.sent;


            console.log('GOT MUSIC', response.data);

            // success?

            if (!(response && response.ok)) {
              _context.next = 20;
              break;
            }

            //let count = response.data.meta.pagination.total;
            //let data = response.data.data;

            data = response.data.data;
            count = response.data.total;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_MusicSchema2.default));

            if (!payload.result.length) {
              payload.entities.music = {};
            }
            payload.query = query;
            payload.path = path;
            payload.count = count;

            console.log('NORMALIZED DATA', payload);

            _context.next = 18;
            return (0, _effects.put)(_Creators2.default.getMusicSuccess(payload));

          case 18:
            _context.next = 22;
            break;

          case 20:
            _context.next = 22;
            return (0, _effects.put)(_Creators2.default.getMusicFailure(response.data));

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  function attemptArtists(meta) {
    var query, path, response, data, count, payload;
    return _regenerator2.default.wrap(function attemptArtists$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            // for new pagination
            query = meta.query ? meta.query : meta;
            path = meta.path ? meta.path : "/artists/";

            // make the call to the api

            _context2.next = 4;
            return (0, _effects.call)(api.getArtists, query);

          case 4:
            response = _context2.sent;


            console.log('GOT ARTISTS', response.data);

            // success?

            if (!(response && response.ok)) {
              _context2.next = 19;
              break;
            }

            //let count = response.data.meta.pagination.total;
            //let data = response.data.data;

            data = response.data.data;
            count = response.data.total;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_ArtistSchema2.default));

            if (!payload.result.length) {
              payload.entities.artists = {};
            }
            payload.query = query;
            payload.path = path;
            payload.count = count;

            console.log('NORMALIZED DATA', payload);

            _context2.next = 17;
            return (0, _effects.put)(_Creators2.default.getArtistsSuccess(payload));

          case 17:
            _context2.next = 21;
            break;

          case 19:
            _context2.next = 21;
            return (0, _effects.put)(_Creators2.default.getArtistsFailure(response.data));

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked2, this);
  }

  function watchGetMusicAttempt() {
    return _regenerator2.default.wrap(function watchGetMusicAttempt$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _reduxSaga.takeEvery)(_Types2.default.GET_MUSIC_REQUEST, attemptGetMusic);

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked3, this);
  }

  function watchGetArtistsAttempt() {
    var _ref, meta;

    return _regenerator2.default.wrap(function watchGetArtistsAttempt$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!true) {
              _context4.next = 9;
              break;
            }

            _context4.next = 3;
            return (0, _effects.take)(_Types2.default.GET_ARTISTS_REQUEST);

          case 3:
            _ref = _context4.sent;
            meta = _ref.meta;
            _context4.next = 7;
            return (0, _effects.call)(attemptGetArtists, meta);

          case 7:
            _context4.next = 0;
            break;

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked4, this);
  }

  return {
    attemptGetMusic: attemptGetMusic,
    watchGetMusicAttempt: watchGetMusicAttempt,

    attemptArtists: attemptArtists,
    watchGetArtistsAttempt: watchGetArtistsAttempt
  };
};