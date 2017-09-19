import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

const insertKeys = () => {}

let collections = {};

export const INITIAL_STATE = Immutable({
  entities: {},
  collections: collections,
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) => {
  
  let path = '';
  if (action.meta.path) {
    path = action.meta.path.replace(/\//g,'');
    if (!collections[path]) collections[path] = {};
    collections[path].result = [];
    collections[path].attempting = true;
    collections[path].count = 0;
  }

  return state.merge({ 
    attempting: true,
    collections: collections
  })
}

// recieve
const success = (state, action) => {

  let path = '';
  if (action.payload.path) {
    path = action.payload.path.replace(/\//g,'');
    if (!collections[path]) collections[path] = {};
    collections[path].result = action.payload.result;
    collections[path].count = action.payload.count || 0;
    collections[path].attempting = false;
  }

  return state.merge({
    attempting: false,
    errorCode: null,
    entities: state.entities.merge(action.payload.entities.artists),
    //result: action.payload.result,
    collections: collections
    //result: state.result.concat(action.payload.result)
  })
}

// failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_ARTISTS_REQUEST]: attempt,
  [Types.GET_ARTISTS_SUCCESS]: success,
  [Types.GET_ARTISTS_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
