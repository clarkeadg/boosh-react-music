
/* React */
import React from 'react';

/* Components */
import { MediaObject, MediaObjectSection, Thumbnail } from 'react-foundation'
import { Link } from 'react-router'

class VideoThumb extends React.Component {

  render() {
    //console.log('111111', this.props)
    let { video } = this.props;
    if (!video) return false;

    /*return (
      <Link to={'/music/video/'+video.title}>
        <MediaObject>
          <MediaObjectSection>
            <Thumbnail src={video.photo}/>
          </MediaObjectSection>
          <MediaObjectSection isMain>
            <h6>{video.title}</h6>
            <p></p>
          </MediaObjectSection>
        </MediaObject>
      </Link>
    );*/

    return (
      <Link to={'/video/'+video.title.label}>
        <MediaObject>
          <MediaObjectSection>
            <Thumbnail src={video["im:image"][video["im:image"].length-1].label}/>
          </MediaObjectSection>
          <MediaObjectSection isMain>
            <h6>{video.title.label}</h6>
            <p></p>
          </MediaObjectSection>
        </MediaObject>
      </Link>
    );
  }

}

export default VideoThumb


