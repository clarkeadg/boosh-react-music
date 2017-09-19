
/* React */
import React from 'react'
import { connect } from 'react-redux'

/* Actions */
import Actions from '../../Actions/Creators'

/* Selectors */
import { getNav, getFilter, getVisibleiTunes } from '../../Selectors/iTunesSelector'

/* Preloaders */
import GetMusicListSaga from '../../Sagas/Preloaders/GetMusicListSaga'

/* Components */
import Masonry from 'react-masonry-component'
import { StickyContainer, Sticky } from 'react-sticky'
import { Row, Column, Menu, MenuItem } from 'react-foundation'
import Portlet from '../../Components/Portlet'
import Carousel from '../../Components/Carousel'
import VideoThumb from '../../Components/VideoThumb'
import Nav from '../../Components/Nav'
import { Link } from 'react-router'

const masonryOptions = {
  transitionDuration: 0
};

class MusicMasonry extends React.Component {

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

  render() {

    let { nav, list } = this.props;

    if (!list.length) return false;

    let childElements = list.map(function(item, id){
       return (
          <li key={id} className="image-element-class">            
            <Link to={'/music/video/'+item.title.label}>
              <img src={item["im:image"][item["im:image"].length-1].label}/>
              <h6>{item.title.label}</h6>
            </Link>        
          </li>
        )
    });

    let carouselItems = list.slice(0,10);

    return (
      <div className="page page-music-list loaded">
        <StickyContainer>          
          <Row className="display">
            <Column small={12}>
              <Sticky>
                <Nav className="nav-filter" items={nav} />
              </Sticky>
            </Column>
          </Row>          
          <Row className="display">
            <Column small={12}>
              <Portlet className={'portlet-clear'} items={
                <Carousel slides={carouselItems.map((item,id) => {
                  return {
                    title: item.title.label,
                    banner: item["im:image"][item["im:image"].length-1].label,
                    pattern: true
                  }
                })}/>
              }/>
            </Column>
          </Row>
          <Row className="display">
            <Column small={12}>
              <Masonry
                className={'my-gallery-class'} // default '' 
                elementType={'ul'} // default 'div' 
                options={masonryOptions} // default {} 
                disableImagesLoaded={false} // default false 
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
              >
                {childElements}
              </Masonry>
            </Column>
          </Row> 
        </StickyContainer>       
      </div>
    );
  }

}

const mapStateToProps = (state, props) => {
  return {
    nav: getNav(state, props),
    filter: getFilter(state, props),
    list: getVisibleiTunes(state, props)
  }
}

MusicMasonry.propTypes = {
  nav: React.PropTypes.array,
  filter: React.PropTypes.string,
  list: React.PropTypes.array
}

MusicMasonry.defaultProps = {
  nav: [],
  filter: 'all',
  list: []
}

function preload(params, req) {
  return [
    [GetMusicListSaga, params.id]
  ];
}
MusicMasonry.preload = preload;

export default connect(mapStateToProps)(MusicMasonry)
