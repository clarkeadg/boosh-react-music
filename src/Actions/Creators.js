import Types from './Types'

/* ARTISTS */
const getArtistsAttempt = (meta) => ({ type: Types.GET_ARTISTS_REQUEST, meta })
const getArtistsSuccess = (payload) => ({ type: Types.GET_ARTISTS_SUCCESS, payload })
const getArtistsFailure = (errorCode) => ({ type: Types.GET_ARTISTS_FAILURE, errorCode })

/* MUSIC */
const getMusicAttempt = (meta) => ({ type: Types.GET_MUSIC_REQUEST, meta })
const getMusicSuccess = (payload) => ({ type: Types.GET_MUSIC_SUCCESS, payload })
const getMusicFailure = (errorCode) => ({ type: Types.GET_MUSIC_FAILURE, errorCode })

/* ITUNES */
const getItunesAttempt = (meta) => ({ type: Types.GET_ITUNES_REQUEST, meta })
const getItunesSuccess = (payload) => ({ type: Types.GET_ITUNES_SUCCESS, payload })
const getItunesFailure = (errorCode) => ({ type: Types.GET_ITUNES_FAILURE, errorCode })

/* YOUTUBE */
const getYouTubeAttempt = (meta) => ({ type: Types.GET_YOUTUBE_REQUEST, meta })
const getYouTubeSuccess = (payload) => ({ type: Types.GET_YOUTUBE_SUCCESS, payload })
const getYouTubeFailure = (errorCode) => ({ type: Types.GET_YOUTUBE_FAILURE, errorCode })

/**
 Makes available all the action creators we've created.
 */
export default {

  getArtistsAttempt,
  getArtistsSuccess,
  getArtistsFailure,

  getMusicAttempt,
  getMusicSuccess,
  getMusicFailure,

  getItunesAttempt,
  getItunesSuccess,
  getItunesFailure,

  getYouTubeAttempt,
  getYouTubeSuccess,
  getYouTubeFailure
}
