import { createSelector } from 'reselect'

/* Private */

const allYoutubes = (state, props) => state.youtube

const videoTitle = (state, props) => props.routeParams.videoTitle || ""

/* Export */

export const getVisibleYoutube = createSelector(
  [ allYoutubes ],
  ( youtubes ) => {
    if (!youtubes) return {};
    if (!youtubes.entities) return {};
    if (!youtubes.result) return {};
    return youtubes.entities[youtubes.result[0]]
    /*return youtubes.result.map((id) => {
      return youtubes.entities[id]
    })*/
  }
)

export const getVideoTitle = createSelector(
  [ videoTitle ],
  ( title ) => title
)
