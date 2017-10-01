
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getMusicCollection } from '../Selectors/MusicSelector'

/* Components */
import { Row, Column } from 'react-foundation';
import { Pagination, Portlet, Loading } from 'boosh-react-components'
//import VideoThumb from '../Components/VideoThumb/VideoThumb'
import { Link } from 'react-router'

class MusicCollection extends React.Component {

  renderMusic(loading, music, filter) {
    if (!music) return false;
    //console.log('RENDER USERS', loading, music)
    if (loading) {
      return (
        <Loading/>
      )
    }

    let size = this.props.size || 4;

    return (
      <Row upOnSmall={2} upOnMedium={4} upOnLarge={size}>
        {music.map((item, id) => {
          return (
            <Column key={id}>
              <Link className="videothumb" to={'/video/'+item.title+'/'+filter}>
                <div className="videothumb-cont">
                  <img src={'//img.youtube.com/vi/'+item.ytid+'/mqdefault.jpg'}/>
                  <h6>{item.title}</h6>
                </div>
              </Link>
            </Column>
          )
        })}
      </Row>
    )
  }

  render() {

    let { music, pageNumber, loading, viewType, filter } = this.props;

    let path = this.props.path || "/music/";
    let per_page = this.props.per_page || 10;
    let pager = this.props.pager || "numbers";

    return (
      <div className={"music music-"+viewType}>
        { this.renderMusic(loading, music.items, filter) }
        <Pagination path={path} pager={pager} per_page={per_page} pageNumber={pageNumber} count={music.count}/>
      </div>
    )
  }

}

MusicCollection.propTypes = {
  loading: React.PropTypes.bool,
  music: React.PropTypes.object,
  filter: React.PropTypes.string,
  pageNumber: React.PropTypes.number
}

MusicCollection.defaultProps = {
  viewType: 'grid',
  loading: true,
  filter: 'all',
  music: {},
  pageNumber: 1
}

export default MusicCollection