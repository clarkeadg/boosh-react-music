'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _iTunesSelector = require('../Selectors/iTunesSelector');

var _YouTubeSelector = require('../Selectors/YouTubeSelector');

var _booshReactFavorites = require('boosh-react-favorites');

var _booshReactReactions = require('boosh-react-reactions');

var _booshReactComments = require('boosh-react-comments');

var _reactFoundation = require('react-foundation');

var _reactYoutube = require('react-youtube');

var _reactYoutube2 = _interopRequireDefault(_reactYoutube);

var _booshReactComponents = require('boosh-react-components');

var _VideoThumb = require('../Components/VideoThumb/VideoThumb');

var _VideoThumb2 = _interopRequireDefault(_VideoThumb);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Collections */


/* Sagas */
//import GetMusicListSaga from '../../Sagas/Preloaders/GetMusicListSaga'
//import GetMusicVideoSaga from '../../Sagas/Preloaders/GetMusicVideoSaga'

/* Buttons */


/* Selectors */
var MusicVideo = function (_React$Component) {
  (0, _inherits3.default)(MusicVideo, _React$Component);

  function MusicVideo() {
    (0, _classCallCheck3.default)(this, MusicVideo);
    return (0, _possibleConstructorReturn3.default)(this, (MusicVideo.__proto__ || (0, _getPrototypeOf2.default)(MusicVideo)).apply(this, arguments));
  }

  (0, _createClass3.default)(MusicVideo, [{
    key: 'getData',
    value: function getData(filter, videoTitle) {
      this.props.dispatch(_Creators2.default.getYouTubeAttempt(videoTitle));
      this.props.dispatch(_Creators2.default.getItunesAttempt(filter));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          filter = _props.filter,
          videoTitle = _props.videoTitle;

      if (videoTitle) {
        this.getData(filter, videoTitle);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.videoTitle !== this.props.videoTitle) {
        this.getData(newProps.filter, newProps.videoTitle);
      }
    }
  }, {
    key: 'renderVideo',
    value: function renderVideo(id, videoTitle) {
      var opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1
          //origin: 'www.youtube.com'
        }
      };

      //{ <FavoritesButton object_group={'video'} object_id={videoTitle}/> }

      return _react2.default.createElement(
        'div',
        { className: 'video' },
        _react2.default.createElement(_booshReactComponents.Portlet, { className: 'portlet-nopad', items: _react2.default.createElement(
            _reactFoundation.FlexVideo,
            { isWidescreen: true },
            _react2.default.createElement(_reactYoutube2.default, { videoId: id, opts: opts })
          ) }),
        _react2.default.createElement(_booshReactComponents.Portlet, { title: videoTitle, items: _react2.default.createElement(
            'div',
            { className: 'meta' },
            _react2.default.createElement(_booshReactReactions.ReactionsButton, { reaction: 'Favorite', item_type: 'video', item_id: videoTitle }),
            _react2.default.createElement(
              'div',
              { className: 'float-right' },
              _react2.default.createElement(_booshReactReactions.ReactionsButton, { reaction: 'Like', item_type: 'video', item_id: videoTitle })
            )
          ) })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          nav = _props2.nav,
          list = _props2.list,
          video = _props2.video,
          videoTitle = _props2.videoTitle;

      if (!video) return false;

      var listItems = list.slice(0, 10);

      return _react2.default.createElement(
        'div',
        { className: 'page page-music-video loaded' },
        _react2.default.createElement(
          _reactFoundation.Row,
          { className: 'display' },
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 12 },
            _react2.default.createElement(_booshReactComponents.Nav, { items: nav })
          )
        ),
        _react2.default.createElement(
          _reactFoundation.Row,
          { className: 'display' },
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 12, medium: 7, large: 8 },
            this.renderVideo(video.id.videoId, videoTitle),
            _react2.default.createElement(_booshReactComponents.Portlet, { title: 'Comments', items: _react2.default.createElement(_booshReactComments.CommentsCollection, { item_type: 'video', item_id: videoTitle }) })
          ),
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 12, medium: 5, large: 4 },
            _react2.default.createElement(_booshReactComponents.Portlet, { title: 'Up Next', items: _react2.default.createElement(
                'div',
                { className: 'list' },
                listItems.map(function (item, id) {
                  return _react2.default.createElement(
                    'div',
                    { className: 'videothumb', key: id },
                    _react2.default.createElement(_VideoThumb2.default, { video: item })
                  );
                })
              ) })
          )
        )
      );
    }
  }]);
  return MusicVideo;
}(_react2.default.Component);

/* Components */


/* Actions */

/* React */


var mapStateToProps = function mapStateToProps(state, props) {
  return {
    videoTitle: (0, _YouTubeSelector.getVideoTitle)(state, props),
    nav: (0, _iTunesSelector.getNav)(state, props),
    filter: (0, _iTunesSelector.getFilter)(state, props),
    list: (0, _iTunesSelector.getVisibleiTunes)(state, props),
    video: (0, _YouTubeSelector.getVisibleYoutube)(state, props)
  };
};

MusicVideo.propTypes = {
  videoTitle: _react2.default.PropTypes.string,
  nav: _react2.default.PropTypes.array,
  filter: _react2.default.PropTypes.string,
  list: _react2.default.PropTypes.array,
  video: _react2.default.PropTypes.object
};

MusicVideo.defaultProps = {
  videoTitle: '',
  nav: [],
  filter: 'all',
  list: [],
  video: null

  /*function preload(params, req) {
    return [
      [GetMusicListSaga, genre],
      [GetMusicVideoSaga, params.id]
    ];
  }
  MusicVideo.preload = preload;*/

};exports.default = (0, _reactRedux.connect)(mapStateToProps)(MusicVideo);