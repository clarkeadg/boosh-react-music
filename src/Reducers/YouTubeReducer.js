import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  entities: {},
  result: [],
  fetching: null,
  error: null
})

// request
const request = (state, action) =>
  state.merge({
    fetching: true
  })

// receive
const receive = (state, action) => {
  return state.merge({
    fetching: false,
    error: null,
    entities: state.entities.merge(action.payload.entities.youtube),
    result: action.payload.result
  })
}

// failure
const failure = (state, action) =>
  state.merge({
    fetching: false,
    error: true,
    data: null
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_YOUTUBE_REQUEST]: request,
  [Types.GET_YOUTUBE_SUCCESS]: receive,
  [Types.GET_YOUTUBE_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
