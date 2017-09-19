
/* React */
import React from 'react'
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getNav, getFilter, getVisibleiTunes } from '../Selectors/iTunesSelector'
import { getVisibleYoutube, getVideoTitle } from '../Selectors/YouTubeSelector'

/* Sagas */
//import GetMusicListSaga from '../../Sagas/Preloaders/GetMusicListSaga'
//import GetMusicVideoSaga from '../../Sagas/Preloaders/GetMusicVideoSaga'

/* Buttons */
import { FavoritesButton } from 'boosh-react-favorites'
import { ReactionsButton } from 'boosh-react-reactions'

/* Collections */
import { CommentsCollection } from 'boosh-react-comments'

/* Components */
import { Row, Column, Menu, MenuItem, FlexVideo } from 'react-foundation';
import YouTube from 'react-youtube';
import { Portlet, Nav } from 'boosh-react-components'
import VideoThumb from '../Components/VideoThumb/VideoThumb';
import { Link } from 'react-router'

class MusicVideo extends React.Component {

  getData(filter, videoTitle) {
    this.props.dispatch(Actions.getYouTubeAttempt(videoTitle))
    this.props.dispatch(Actions.getItunesAttempt(filter));
  }

  componentDidMount() {
    let { filter, videoTitle } = this.props
    if (videoTitle) {
      this.getData(filter, videoTitle);
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.videoTitle !== this.props.videoTitle) {
      this.getData(newProps.filter, newProps.videoTitle)
    }
  }

  renderVideo(id, videoTitle) {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
        //origin: 'www.youtube.com'
      }
    };

    //{ <FavoritesButton object_group={'video'} object_id={videoTitle}/> }

    return (
      <div className="video">
        <Portlet className="portlet-nopad" items={
          <FlexVideo isWidescreen>
            <YouTube videoId={id} opts={opts} />
          </FlexVideo>
        }/>
        <Portlet title={videoTitle} items={
          <div className="meta">
            { <ReactionsButton reaction={'Favorite'} item_type={'video'} item_id={videoTitle}/> }
            <div className="float-right">
              { <ReactionsButton reaction={'Like'} item_type={'video'} item_id={videoTitle}/> }
            </div>
          </div>
        }/>
      </div>
    );
  }

  render() {

    let { nav, list, video, videoTitle } = this.props;
    if (!video) return false;

    let listItems = list.slice(0,10);

    return (
      <div className="page page-music-video loaded">
        <Row className="display">
          <Column small={12}>
            <Nav items={nav} />
          </Column>
        </Row>
        <Row className="display">
          <Column small={12} medium={7} large={8}>
            {this.renderVideo(video.id.videoId, videoTitle)}
            <Portlet title={'Comments'} items={
              <CommentsCollection item_type={'video'} item_id={videoTitle} />
            } />
          </Column>
          <Column small={12} medium={5} large={4}>
            <Portlet title={'Up Next'} items={
              <div className="list">
                {listItems.map((item,id) => {
                  return (
                    <div className="videothumb" key={id}>
                      <VideoThumb video={item}/>
                    </div>
                  )
                })}
              </div>
            }/>
          </Column>
        </Row>
      </div>
    );
  }

}

const mapStateToProps = (state, props) => {
  return {
    videoTitle: getVideoTitle(state, props),
    nav: getNav(state, props),
    filter: getFilter(state, props),
    list: getVisibleiTunes(state, props),
    video: getVisibleYoutube(state, props)
  }
}

MusicVideo.propTypes = {
  videoTitle: React.PropTypes.string,
  nav: React.PropTypes.array,
  filter: React.PropTypes.string,
  list: React.PropTypes.array,
  video: React.PropTypes.object
}

MusicVideo.defaultProps = {
  videoTitle: '',
  nav: [],
  filter: 'all',
  list: [],
  video: null
}

/*function preload(params, req) {
  return [
    [GetMusicListSaga, genre],
    [GetMusicVideoSaga, params.id]
  ];
}
MusicVideo.preload = preload;*/

export default connect(mapStateToProps)(MusicVideo)
