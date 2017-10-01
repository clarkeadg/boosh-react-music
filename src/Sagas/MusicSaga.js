import { take, put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

import { PaginationActions } from 'boosh-react-pagination'

/* SCHEMAS */
import MusicSchema from '../Schemas/MusicSchema'
import ArtistSchema from '../Schemas/ArtistSchema'

export default (api) => {

  function * attemptGetMusic (meta) {

    // for takeEvery
    meta = meta.meta;

    // for new pagination
    let query = meta.query ? meta.query : meta;
    let path = meta.path ? meta.path : "/music/";  

    // make the call to the api
    let response = yield call(api.getMusic, query) 

    console.log('GOT MUSIC',response.data)

    // success?
    if (response && response.ok) {

      //let count = response.data.meta.pagination.total;
      //let data = response.data.data;

      let data = response.data.data;
      let count = response.data.total;

      let payload = normalize(data, arrayOf(MusicSchema));
      if (!payload.result.length) {
        payload.entities.music = {};
      }
      payload.query = query;
      payload.path = path;
      payload.count = count;

      console.log('NORMALIZED DATA', payload)

      yield put(Actions.getMusicSuccess(payload))
    } else {
      yield put(Actions.getMusicFailure(response.data))
    }
  }

  function * attemptGetArtists (meta) {

    // for new pagination
    let query = meta.query ? meta.query : meta;
    let path = meta.path ? meta.path : "/artists/";  

    // make the call to the api
    let response = yield call(api.getArtists, query) 

    console.log('GOT ARTISTS',response.data)

    // success?
    if (response && response.ok) {

      //let count = response.data.meta.pagination.total;
      //let data = response.data.data;

      let data = response.data.data;
      let count = response.data.total;

      let payload = normalize(data, arrayOf(ArtistSchema));
      if (!payload.result.length) {
        payload.entities.artists = {};
      }
      payload.query = query;
      payload.path = path;
      payload.count = count;

      console.log('NORMALIZED DATA', payload)

      yield put(Actions.getArtistsSuccess(payload))
    } else {
      yield put(Actions.getArtistsFailure(response.data))
    }
  }

  function * watchGetMusicAttempt () {
    yield takeEvery(Types.GET_MUSIC_REQUEST, attemptGetMusic)
    // daemonize
    /*while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_MUSIC_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetMusic, meta)
    }*/
  }

  function * watchGetMusicPreloaderAttempt () {
    const { meta } = yield take(Types.GET_MUSIC_REQUEST)
    yield call(attemptGetMusic, meta)
  }

  function * watchGetArtistsAttempt () {
    //yield takeEvery(Types.GET_ARTISTS_REQUEST, attemptGetArtists)
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_ARTISTS_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetArtists, meta)
    }
  }

  function * watchGetArtistsPreloaderAttempt () {
    const { meta } = yield take(Types.GET_ARTISTS_REQUEST)
     yield call(attemptGetArtists, meta) 
  }

  return {
    attemptGetMusic, 
    watchGetMusicAttempt,
    watchGetMusicPreloaderAttempt,

    attemptGetArtists, 
    watchGetArtistsAttempt,
    watchGetArtistsPreloaderAttempt
  }
}
