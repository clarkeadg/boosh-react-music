import { createSelector } from 'reselect'

/* Private */

const alliTunes = (state, props) => state.itunes

const filter = (state, props) => props.routeParams.filter || "all"

const title = (state, props) => props.title

const nav = (state, props) => {
  return [
    {"title":"All","url":"/music/all"},
    {"title":"Alternative","url":"/music/alternative"},
    {"title":"Country","url":"/music/country"},
    {"title":"Dance","url":"/music/dance"},
    {"title":"Electronic","url":"/music/electronic"},    
    {"title":"Latino","url":"/music/latino"},
    {"title":"Pop","url":"/music/pop"}, 
    {"title":"Rap","url":"/music/rap"},
    {"title":"Rock","url":"/music/rock"},      
    {"title":"Soul","url":"/music/soul"}
  ]
}

/* Export */

export const getVisibleiTunes = createSelector(
  [ alliTunes ],
  ( itunes ) => {
    if (!itunes || !itunes.result) return [];
    return itunes.result.map((id) => {
      return itunes.entities[id]
    })
  }
)

export const getFilter = createSelector(
  [ filter ],
  ( key ) => {
    return key
  }
)

export const getNav = createSelector(
  [ nav ],
  ( rs ) => {
    return rs
  }
)

export const getVideoByTitle = createSelector(
  [ alliTunes, title ],
  ( itunes, name ) => {
    //console.log(itunes, id)
    let rs = null
    itunes.result.map((id) => {
      //console.log(itunes.entities[id].title.label, name)
      if (itunes.entities[id].title.label == name) {
        rs = itunes.entities[id]
      }
    })
    return rs;
  }
)




