
/* React */
import React from 'react';
import { connect } from 'react-redux'

import Actions from '../../Actions/Creators'

import { getVideoById } from '../../Selectors/MusicSelector'

/* Components */
//import { MediaObject, MediaObjectSection, Thumbnail } from 'react-foundation'
import { Link } from 'react-router'

class GetVideoThumb extends React.Component {

  getData(video_id) {
    //console.log('GET USER',user_id)
    let Meta = {
      id: video_id
    }
    this.props.dispatch(Actions.getMusicAttempt(Meta));
  }

  componentDidMount() {
    if (!this.props.video_id) return;
    this.getData(this.props.video_id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.video_id !== this.props.video_id) {
      this.getData(newProps.video_id)
    }
  }

  render() {
    //console.log('111111', this.props)
    let { item } = this.props;
    if (!item) return false;

    return (
      <Link className="videothumb" to={'/video/'+item.title+'/all'}>
        <div className="videothumb-cont">
          <img src={'http://img.youtube.com/vi/'+item.ytid+'/mqdefault.jpg'}/>
          <h6>{item.title}</h6>
        </div>
      </Link>
    );
  }

}

GetVideoThumb.propTypes = {
  item: React.PropTypes.object,
}

GetVideoThumb.defaultProps = {
  item: {}
}

const mapStateToProps = (state, props) => {
  return {
    item: getVideoById(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

export default connect(mapStateToProps)(GetVideoThumb)


