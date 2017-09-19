import { createSelector } from 'reselect'

/* Private */

const allMusic = (state, props) => state.music

const musicId = (state, props) => props.music_id

const videoId = (state, props) => props.video_id

const videoTitle = (state, props) => props.routeParams.videoTitle || ''

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'music'

/* Exports */

export const getMusicCollection = createSelector(
  [ allMusic, path ],
  ( music, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!music.collections[key]) return collection;
    collection.count = music.collections[key].count;
    collection.items = music.collections[key].result.map((id) => {
      return music.entities[id]
    })
    return collection;
  }
)

export const getVideoById = createSelector(
  [ allMusic,  videoId ],
  ( music, title ) => {
    for (let id in music.entities) {
      if (music.entities[id].title == title) {
        return music.entities[id];
      }
    }
    return null;
  }
)

export const getVisibleMusic = createSelector(
  [ allMusic ],
  ( music ) => {
    return music.result.map((id) => {
      return music.entities[id]
    })
  }
)

export const getMusicById = createSelector(
  [ allMusic,  musicId ],
  ( music, id ) => {
    return music.entities[id]
  }
)

export const getMusicByTitle = createSelector(
  [ allMusic,  videoTitle ],
  ( music, title ) => {
    for (let id in music.entities) {
      if (music.entities[id].title == title) {
        return music.entities[id];
      }
    }
    return null;
  }
)
