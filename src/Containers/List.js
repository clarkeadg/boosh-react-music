
/* React */
import React from 'react'
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getNav, getFilter, getVisibleiTunes } from '../Selectors/iTunesSelector'

/* Preloaders */
//import GetMusicListSaga from '../../Sagas/Preloaders/GetMusicListSaga'

/* Components */
import { Row, Column, Menu, MenuItem } from 'react-foundation'
import { Portlet, Carousel, Nav, Loading } from 'boosh-react-components'
import VideoThumb from '../Components/VideoThumb/VideoThumb'
import { Link } from 'react-router'

class MusicList extends React.Component {

  getData(filter) {
    this.props.dispatch(Actions.getItunesAttempt(filter));
  }

  componentDidMount() {
    this.getData(this.props.filter)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.filter !== this.props.filter) {
      this.getData(newProps.filter)
    }
  }

  renderCarousel(loading, list) {
    if (loading) {
      return false;
      return (
        <Loading/>
      )
    }
    if (!list.length) return false;
    let carouselItems = list.slice(0,10);
    return (
      <Carousel slides={carouselItems.map((item,id) => {
        return {
          title: item.title.label,
          banner: item["im:image"][item["im:image"].length-1].label,
          pattern: true
        }
      })}/>
    )
  }

  renderList(loading, list) {
    if (loading) {
      return (
        <Loading/>
      )
    }
    return (
      <Row upOnSmall={1} upOnMedium={2} upOnLarge={3}>
        {list.map((item,id) => {
          //console.log(item)
          return (
            <Column key={id}>
              <div className="videothumb" >
                <VideoThumb video={item}/>
              </div>
            </Column>
          )
        })}
      </Row>
    )
  }

  render() {

    let { nav, list, loading } = this.props;

    return (
      <div className="page page-music-list loaded">
        <Row className="display">
          <Column small={12}>
            <Nav items={nav} />
          </Column>
        </Row>
        <Row className="display">
          <Column small={12}>
            <Portlet className={'portlet-clear'} items={
              <div>
                { this.renderCarousel(loading, list) }
              </div>
            }/>
          </Column>
        </Row>
        <Row className="display">
          <Column small={12}>
            <Portlet title={'Music Videos'} items={
              <div>
                { this.renderList(loading, list) }
              </div>
            }/>
          </Column>
        </Row>
      </div>
    );
  }

}

MusicList.propTypes = {
  loading: React.PropTypes.bool,
  nav: React.PropTypes.array,
  filter: React.PropTypes.string,
  list: React.PropTypes.array
}

MusicList.defaultProps = {
  loading: true,
  nav: [],
  filter: 'all',
  list: []
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.itunes.fetching,
    nav: getNav(state, props),
    filter: getFilter(state, props),
    list: getVisibleiTunes(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetMusicListSaga, params.id]
  ];
}
MusicList.preload = preload;*/

export default connect(mapStateToProps)(MusicList)
