import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

/* SCHEMAS */
import YoutubeSchema from '../Schemas/YouTubeSchema'

// This style of Saga is a common pattern.  It has a
// worker and a watcher.
//
// The watcher listens for the signal, and the worker
// does the job.

// We use a factory function will close over the scope of
// our watcher saga.  This ensures the API is passed in
// (hurray objects being composed).
export default (api) => {
  // ----------
  // The Worker
  // ----------
  // This is our worker.  It does the job.  In this case, we
  // get the weather for the city.
  function * worker (meta) {

    // make the call to the api
    const response = yield call(api.searchYouTube, meta)

    //console.log('GOT YOUTUBE', response.data)

    // success?
    if (response && response.ok) {

      let payload = normalize(response.data.items, arrayOf(YoutubeSchema));
      if (!payload.result.length) {
        payload.entities.youtube = {};
      }
      //console.log('NORMALIZED DATA', payload)

      yield put(Actions.getYouTubeSuccess(payload))
    } else {
      yield put(Actions.getYouTubeFailure())
    }
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
  function * watcher () {
    //while (true) {
      const action = yield take(Types.GET_YOUTUBE_REQUEST)
      const { meta } = action
      yield call(worker, meta)
    //}
  }

  function * watchYouTube () {
    while (true) {
      const action = yield take(Types.GET_YOUTUBE_REQUEST)
      const { meta } = action
      yield call(worker, meta)
    }
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
    watcher,
    watchYouTube,
    worker
  }
}
