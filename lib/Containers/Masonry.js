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

var _Creators = require('../../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _iTunesSelector = require('../../Selectors/iTunesSelector');

var _GetMusicListSaga = require('../../Sagas/Preloaders/GetMusicListSaga');

var _GetMusicListSaga2 = _interopRequireDefault(_GetMusicListSaga);

var _reactMasonryComponent = require('react-masonry-component');

var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

var _reactSticky = require('react-sticky');

var _reactFoundation = require('react-foundation');

var _Portlet = require('../../Components/Portlet');

var _Portlet2 = _interopRequireDefault(_Portlet);

var _Carousel = require('../../Components/Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _VideoThumb = require('../../Components/VideoThumb');

var _VideoThumb2 = _interopRequireDefault(_VideoThumb);

var _Nav = require('../../Components/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Components */


/* Selectors */
var masonryOptions = {
  transitionDuration: 0
};

/* Preloaders */


/* Actions */

/* React */

var MusicMasonry = function (_React$Component) {
  (0, _inherits3.default)(MusicMasonry, _React$Component);

  function MusicMasonry() {
    (0, _classCallCheck3.default)(this, MusicMasonry);
    return (0, _possibleConstructorReturn3.default)(this, (MusicMasonry.__proto__ || (0, _getPrototypeOf2.default)(MusicMasonry)).apply(this, arguments));
  }

  (0, _createClass3.default)(MusicMasonry, [{
    key: 'getData',
    value: function getData(filter) {
      this.props.dispatch(_Creators2.default.getItunesAttempt(filter));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getData(this.props.filter);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.filter !== this.props.filter) {
        this.getData(newProps.filter);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          nav = _props.nav,
          list = _props.list;


      if (!list.length) return false;

      var childElements = list.map(function (item, id) {
        return _react2.default.createElement(
          'li',
          { key: id, className: 'image-element-class' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/music/video/' + item.title.label },
            _react2.default.createElement('img', { src: item["im:image"][item["im:image"].length - 1].label }),
            _react2.default.createElement(
              'h6',
              null,
              item.title.label
            )
          )
        );
      });

      var carouselItems = list.slice(0, 10);

      return _react2.default.createElement(
        'div',
        { className: 'page page-music-list loaded' },
        _react2.default.createElement(
          _reactSticky.StickyContainer,
          null,
          _react2.default.createElement(
            _reactFoundation.Row,
            { className: 'display' },
            _react2.default.createElement(
              _reactFoundation.Column,
              { small: 12 },
              _react2.default.createElement(
                _reactSticky.Sticky,
                null,
                _react2.default.createElement(_Nav2.default, { className: 'nav-filter', items: nav })
              )
            )
          ),
          _react2.default.createElement(
            _reactFoundation.Row,
            { className: 'display' },
            _react2.default.createElement(
              _reactFoundation.Column,
              { small: 12 },
              _react2.default.createElement(_Portlet2.default, { className: 'portlet-clear', items: _react2.default.createElement(_Carousel2.default, { slides: carouselItems.map(function (item, id) {
                    return {
                      title: item.title.label,
                      banner: item["im:image"][item["im:image"].length - 1].label,
                      pattern: true
                    };
                  }) }) })
            )
          ),
          _react2.default.createElement(
            _reactFoundation.Row,
            { className: 'display' },
            _react2.default.createElement(
              _reactFoundation.Column,
              { small: 12 },
              _react2.default.createElement(
                _reactMasonryComponent2.default,
                {
                  className: 'my-gallery-class' // default '' 
                  , elementType: 'ul' // default 'div' 
                  , options: masonryOptions // default {} 
                  , disableImagesLoaded: false // default false 
                  , updateOnEachImageLoad: false // default false and works only if disableImagesLoaded is false 
                },
                childElements
              )
            )
          )
        )
      );
    }
  }]);
  return MusicMasonry;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    nav: (0, _iTunesSelector.getNav)(state, props),
    filter: (0, _iTunesSelector.getFilter)(state, props),
    list: (0, _iTunesSelector.getVisibleiTunes)(state, props)
  };
};

MusicMasonry.propTypes = {
  nav: _react2.default.PropTypes.array,
  filter: _react2.default.PropTypes.string,
  list: _react2.default.PropTypes.array
};

MusicMasonry.defaultProps = {
  nav: [],
  filter: 'all',
  list: []
};

function preload(params, req) {
  return [[_GetMusicListSaga2.default, params.id]];
}
MusicMasonry.preload = preload;

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MusicMasonry);