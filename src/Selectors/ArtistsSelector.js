import { createSelector } from 'reselect'

/* Private */

const allArtists = (state, props) => state.artists

const artistId = (state, props) => props.artist_id

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'artists'

/* Exports */

export const getArtistsCollection = createSelector(
  [ allArtists, path ],
  ( artists, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!artists.collections[key]) return collection;
    collection.count = artists.collections[key].count;
    collection.items = artists.collections[key].result.map((id) => {
      return artists.entities[id]
    })
    return collection;
  }
)

export const getVisibleArtists = createSelector(
  [ allArtists ],
  ( artists ) => {
    return artists.result.map((id) => {
      return artists.entities[id]
    })
  }
)

export const getArtistById = createSelector(
  [ allArtists,  artistId ],
  ( artists, id ) => {
    return artists.entities[id]
  }
)
