'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _iTunesSchema = require('../Schemas/iTunesSchema');

var _iTunesSchema2 = _interopRequireDefault(_iTunesSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This style of Saga is a common pattern.  It has a
// worker and a watcher.
//
// The watcher listens for the signal, and the worker
// does the job.

// We use a factory function will close over the scope of
// our watcher saga.  This ensures the API is passed in
// (hurray objects being composed).
exports.default = function (api) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(worker),
      _marked2 = /*#__PURE__*/_regenerator2.default.mark(watcher),
      _marked3 = /*#__PURE__*/_regenerator2.default.mark(watchForiTunes);

  // ----------
  // The Worker
  // ----------
  // This is our worker.  It does the job.  In this case, we
  // get the weather for the city.
  function worker(meta) {
    var response, payload;
    return _regenerator2.default.wrap(function worker$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.call)(api.getTopMusicVideos, meta);

          case 2:
            response = _context.sent;

            if (!(response && response.ok)) {
              _context.next = 10;
              break;
            }

            payload = (0, _normalizr.normalize)(response.data.feed.entry, (0, _normalizr.arrayOf)(_iTunesSchema2.default));

            if (!payload.result.length) {
              payload.entities.itunes = {};
            }
            //console.log('NORMALIZED DATA', payload)

            //yield put(Actions.gotPaginationCount({ count: count }))
            // yield put(Actions.getUsersSuccess(payload))
            _context.next = 8;
            return (0, _effects.put)(_Creators2.default.getItunesSuccess(payload));

          case 8:
            _context.next = 12;
            break;

          case 10:
            _context.next = 12;
            return (0, _effects.put)(_Creators2.default.getItunesFailure());

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  // -----------
  // The Watcher
  // -----------
  // Make a watcher.  It's daemon.  It runs on startup and does
  // a few things:
  //
  // 1.  Goes into a loop to ensure it stays alive.
  // 2.  Listens for TEMPERATURE_REQUEST redux events
  // 3.  Unpacks the action.
  // 4.  Calls the worker (above) to do the job.
  function watcher() {
    var action, meta;
    return _regenerator2.default.wrap(function watcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.take)(_Types2.default.GET_ITUNES_REQUEST);

          case 2:
            action = _context2.sent;
            meta = action.meta;
            _context2.next = 6;
            return (0, _effects.call)(worker, meta);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked2, this);
  }

  function watchForiTunes() {
    var action, meta;
    return _regenerator2.default.wrap(function watchForiTunes$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!true) {
              _context3.next = 9;
              break;
            }

            _context3.next = 3;
            return (0, _effects.take)(_Types2.default.GET_ITUNES_REQUEST);

          case 3:
            action = _context3.sent;
            meta = action.meta;
            _context3.next = 7;
            return (0, _effects.call)(worker, meta);

          case 7:
            _context3.next = 0;
            break;

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked3, this);
  }

  // Expose both functions.  Now, technically, we're only
  // needing to return the watcher.  If we return both, we
  // gain 2 important properties:
  //
  // 1.  We can test the worker directly without need to
  // mock the watcher taking.
  //
  // 2.  We can call the worker from other sagas which is
  // often required in some flow control cases.
  return {
    watcher: watcher,
    watchForiTunes: watchForiTunes,
    worker: worker
  };
};

/* SCHEMAS */