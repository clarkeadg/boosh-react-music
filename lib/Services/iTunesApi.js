'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apisauce = require('apisauce');

var _apisauce2 = _interopRequireDefault(_apisauce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// our "constructor"
var create = function create() {
  var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://itunes.apple.com/';

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  var iTunesApi = _apisauce2.default.create({
    // base URL is read from the "constructor"
    baseURL: baseURL,
    // here are some default headers
    headers: {
      //'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  });

  // Force OpenWeather API Key on all requests
  /*api.addRequestTransform(request => {
    request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  })*/

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  //if (__DEV__ && console.tron) {
  //  console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  //  iTunesApi.addMonitor(console.tron.apisauce)
  //}

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  var getTopMusicVideos = function getTopMusicVideos(genre) {
    var limit = 100;
    switch (genre) {
      case 'rock':
        return iTunesApi.get('us/rss/topmusicvideos/limit=' + limit + '/genre=1621/json');
        break;
      case 'pop':
        return iTunesApi.get('us/rss/topmusicvideos/limit=' + limit + '/genre=1614/json');
        break;
      case 'dance':
        return iTunesApi.get('us/rss/topmusicvideos/limit=' + limit + '/genre=1617/json');
        break;
      case 'latin':
        return iTunesApi.get('us/rss/topmusicvideos/limit=' + limit + '/genre=1612/json');
        break;
      case 'rap':
        return iTunesApi.get('us/rss/topmusicvideos/limit=' + limit + '/genre=1618/json');
        break;
      default:
        return iTunesApi.get('us/rss/topmusicvideos/limit=' + limit + '/json');
        break;
    }
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getTopMusicVideos: getTopMusicVideos
  };
};

// let's return back our create method as the default.
// a library to wrap and simplify api calls
exports.default = {
  create: create
};