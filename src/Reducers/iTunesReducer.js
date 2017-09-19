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
const receive = (state, action) =>
  state.merge({
    fetching: false,
    error: null,
    entities: state.entities.merge(action.payload.entities.itunes),
    result: action.payload.result
    //result: state.result.concat(action.payload.result)
  })

// failure
const failure = (state, action) =>
  state.merge({
    fetching: false,
    error: true
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_ITUNES_REQUEST]: request,
  [Types.GET_ITUNES_SUCCESS]: receive,
  [Types.GET_ITUNES_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
