'use strict';

var MusicActions = require('./Actions/Creators');
var VideoThumb = require('./Components/VideoThumb/VideoThumb');
var GetVideoThumb = require('./Components/VideoThumb/GetVideoThumb');
var MusicCollection = require('./Collections/MusicCollection');
var ArtistsCollection = require('./Collections/ArtistsCollection');
var iTunesSelector = require('./Selectors/iTunesSelector');
var YoutubeSelector = require('./Selectors/YouTubeSelector');
var MusicSelector = require('./Selectors/MusicSelector');
var ArtistsSelector = require('./Selectors/ArtistsSelector');
var iTunesSaga = require('./Sagas/iTunesSaga');
var YouTubeSaga = require('./Sagas/YouTubeSaga');
var MusicSaga = require('./Sagas/MusicSaga');
var iTunesApi = require('./Services/iTunesApi');
var YouTubeApi = require('./Services/YouTubeApi');
var MusicApi = require('./Services/MusicApi');
var MusicReducer = require('./Reducers/MusicReducer');
var ArtistsReducer = require('./Reducers/ArtistsReducer');
var iTunesReducer = require('./Reducers/iTunesReducer');
var YouTubeReducer = require('./Reducers/YouTubeReducer');
var MusicRoutes = require('./routes');

module.exports = {
  MusicActions: MusicActions.default,
  VideoThumb: VideoThumb.default,
  GetVideoThumb: GetVideoThumb.default,
  MusicCollection: MusicCollection.default,
  ArtistsCollection: ArtistsCollection.default,
  getVisibleiTunes: iTunesSelector.getVisibleiTunes,
  getNav: iTunesSelector.getNav,
  getFilter: iTunesSelector.getFilter,
  getVisibleYoutube: YoutubeSelector.getVisibleYoutube,
  getVideoTitle: YoutubeSelector.getVideoTitle,
  getMusicCollection: MusicSelector.getMusicCollection,
  getMusicByTitle: MusicSelector.getMusicByTitle,
  getArtistsCollection: ArtistsSelector.getArtistsCollection,
  iTunesSaga: iTunesSaga.default,
  YouTubeSaga: YouTubeSaga.default,
  MusicSaga: MusicSaga.default,
  iTunesApi: iTunesApi.default,
  YouTubeApi: YouTubeApi.default,
  MusicApi: MusicApi.default,
  MusicReducer: MusicReducer.default,
  ArtistsReducer: ArtistsReducer.default,
  iTunesReducer: iTunesReducer.default,
  YouTubeReducer: YouTubeReducer.default,
  MusicRoutes: MusicRoutes.default
};