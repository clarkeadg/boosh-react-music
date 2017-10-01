
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getArtistsCollection } from '../Selectors/ArtistsSelector'

/* Components */
import { Row, Column } from 'react-foundation';
import { Pagination, Portlet, Loading } from 'boosh-react-components'
//import VideoThumb from '../Components/VideoThumb/VideoThumb'
import { Link } from 'react-router'

class ArtistsCollection extends React.Component {

  renderArtists(loading, artists) {
    if (!artists) return false;
    //console.log('RENDER USERS', loading, music)
    if (loading) {
      return (
        <Loading/>
      )
    }

    let size = this.props.size || 4;
    let photo = '';

    return (
      <Row upOnSmall={2} upOnMedium={4} upOnLarge={size}>
        {artists.map((item, id) => {
          photo = item.photo.replace('http://','//');
          return (
            <Column key={id}>
              <Link className="videothumb" to={'/artist/'+item.title}>
                <div className="videothumb-cont">
                  <img src={photo}/>
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

    let { artists, pageNumber, loading, viewType } = this.props;

    let path = this.props.path || "/artists/";
    let per_page = this.props.per_page || 10;
    let pager = this.props.pager || "numbers";

    return (
      <div className={"artists artists-"+viewType}>
        { this.renderArtists(loading, artists.items) }
        <Pagination path={path} pager={pager} per_page={per_page} pageNumber={pageNumber} count={artists.count}/>
      </div>
    )
  }

}

ArtistsCollection.propTypes = {
  loading: React.PropTypes.bool,
  artists: React.PropTypes.object,
  pageNumber: React.PropTypes.number
}

ArtistsCollection.defaultProps = {
  viewType: 'grid',
  loading: true,
  artists: {},
  pageNumber: 1
}

export default ArtistsCollection