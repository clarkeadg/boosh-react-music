
const MusicActions      = require('./Actions/Creators');
const VideoThumb        = require('./Components/VideoThumb/VideoThumb');
const GetVideoThumb     = require('./Components/VideoThumb/GetVideoThumb');
const MusicCollection   = require('./Collections/MusicCollection');
const ArtistsCollection = require('./Collections/ArtistsCollection');
const iTunesSelector    = require('./Selectors/iTunesSelector');
const YoutubeSelector   = require('./Selectors/YouTubeSelector');
const MusicSelector     = require('./Selectors/MusicSelector');
const ArtistsSelector   = require('./Selectors/ArtistsSelector');
const iTunesSaga        = require('./Sagas/iTunesSaga');
const YouTubeSaga       = require('./Sagas/YouTubeSaga');
const MusicSaga         = require('./Sagas/MusicSaga');
const iTunesApi         = require('./Services/iTunesApi');
const YouTubeApi        = require('./Services/YouTubeApi');
const MusicApi          = require('./Services/MusicApi');
const MusicReducer      = require('./Reducers/MusicReducer');
const ArtistsReducer    = require('./Reducers/ArtistsReducer');
const iTunesReducer     = require('./Reducers/iTunesReducer');
const YouTubeReducer    = require('./Reducers/YouTubeReducer');
const MusicRoutes       = require('./routes');

module.exports = {
  MusicActions:         MusicActions.default,
  VideoThumb:           VideoThumb,
  GetVideoThumb:        GetVideoThumb.default,
  MusicCollection:      MusicCollection.default,
  ArtistsCollection:    ArtistsCollection.default,
  getVisibleiTunes:     iTunesSelector.getVisibleiTunes,
  getNav:               iTunesSelector.getNav,
  getFilter:            iTunesSelector.getFilter,
  getVisibleYoutube:    YoutubeSelector.getVisibleYoutube,
  getVideoTitle:        YoutubeSelector.getVideoTitle,
  getMusicCollection:   MusicSelector.getMusicCollection,
  getMusicByTitle:      MusicSelector.getMusicByTitle,
  getArtistsCollection: ArtistsSelector.getArtistsCollection,
  iTunesSaga:           iTunesSaga.default,
  YouTubeSaga:          YouTubeSaga.default,
  MusicSaga:            MusicSaga.default,
  iTunesApi:            iTunesApi.default,
  YouTubeApi:           YouTubeApi.default,
  MusicApi:             MusicApi.default,
  MusicReducer:         MusicReducer.default,
  ArtistsReducer:       ArtistsReducer.default,
  iTunesReducer:        iTunesReducer.default,
  YouTubeReducer:       YouTubeReducer.default,
  MusicRoutes:          MusicRoutes.default
}
