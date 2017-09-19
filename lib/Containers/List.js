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

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _VideoThumb = require('../Components/VideoThumb/VideoThumb');

var _VideoThumb2 = _interopRequireDefault(_VideoThumb);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Preloaders */
//import GetMusicListSaga from '../../Sagas/Preloaders/GetMusicListSaga'

/* Components */


/* Actions */

/* React */
var MusicList = function (_React$Component) {
  (0, _inherits3.default)(MusicList, _React$Component);

  function MusicList() {
    (0, _classCallCheck3.default)(this, MusicList);
    return (0, _possibleConstructorReturn3.default)(this, (MusicList.__proto__ || (0, _getPrototypeOf2.default)(MusicList)).apply(this, arguments));
  }

  (0, _createClass3.default)(MusicList, [{
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
    key: 'renderCarousel',
    value: function renderCarousel(loading, list) {
      if (loading) {
        return false;
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }
      if (!list.length) return false;
      var carouselItems = list.slice(0, 10);
      return _react2.default.createElement(_booshReactComponents.Carousel, { slides: carouselItems.map(function (item, id) {
          return {
            title: item.title.label,
            banner: item["im:image"][item["im:image"].length - 1].label,
            pattern: true
          };
        }) });
    }
  }, {
    key: 'renderList',
    value: function renderList(loading, list) {
      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }
      return _react2.default.createElement(
        _reactFoundation.Row,
        { upOnSmall: 1, upOnMedium: 2, upOnLarge: 3 },
        list.map(function (item, id) {
          //console.log(item)
          return _react2.default.createElement(
            _reactFoundation.Column,
            { key: id },
            _react2.default.createElement(
              'div',
              { className: 'videothumb' },
              _react2.default.createElement(_VideoThumb2.default, { video: item })
            )
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          nav = _props.nav,
          list = _props.list,
          loading = _props.loading;


      return _react2.default.createElement(
        'div',
        { className: 'page page-music-list loaded' },
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
            { small: 12 },
            _react2.default.createElement(_booshReactComponents.Portlet, { className: 'portlet-clear', items: _react2.default.createElement(
                'div',
                null,
                this.renderCarousel(loading, list)
              ) })
          )
        ),
        _react2.default.createElement(
          _reactFoundation.Row,
          { className: 'display' },
          _react2.default.createElement(
            _reactFoundation.Column,
            { small: 12 },
            _react2.default.createElement(_booshReactComponents.Portlet, { title: 'Music Videos', items: _react2.default.createElement(
                'div',
                null,
                this.renderList(loading, list)
              ) })
          )
        )
      );
    }
  }]);
  return MusicList;
}(_react2.default.Component);

/* Selectors */


MusicList.propTypes = {
  loading: _react2.default.PropTypes.bool,
  nav: _react2.default.PropTypes.array,
  filter: _react2.default.PropTypes.string,
  list: _react2.default.PropTypes.array
};

MusicList.defaultProps = {
  loading: true,
  nav: [],
  filter: 'all',
  list: []
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.itunes.fetching,
    nav: (0, _iTunesSelector.getNav)(state, props),
    filter: (0, _iTunesSelector.getFilter)(state, props),
    list: (0, _iTunesSelector.getVisibleiTunes)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetMusicListSaga, params.id]
  ];
}
MusicList.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MusicList);