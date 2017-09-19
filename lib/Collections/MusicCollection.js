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

var _MusicSelector = require('../Selectors/MusicSelector');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Selectors */
var MusicCollection = function (_React$Component) {
  (0, _inherits3.default)(MusicCollection, _React$Component);

  function MusicCollection() {
    (0, _classCallCheck3.default)(this, MusicCollection);
    return (0, _possibleConstructorReturn3.default)(this, (MusicCollection.__proto__ || (0, _getPrototypeOf2.default)(MusicCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(MusicCollection, [{
    key: 'renderMusic',
    value: function renderMusic(loading, music, filter) {
      if (!music) return false;
      //console.log('RENDER USERS', loading, music)
      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }

      var size = this.props.size || 4;

      return _react2.default.createElement(
        _reactFoundation.Row,
        { upOnSmall: 2, upOnMedium: 4, upOnLarge: size },
        music.map(function (item, id) {
          return _react2.default.createElement(
            _reactFoundation.Column,
            { key: id },
            _react2.default.createElement(
              _reactRouter.Link,
              { className: 'videothumb', to: '/video/' + item.title + '/' + filter },
              _react2.default.createElement(
                'div',
                { className: 'videothumb-cont' },
                _react2.default.createElement('img', { src: 'http://img.youtube.com/vi/' + item.ytid + '/mqdefault.jpg' }),
                _react2.default.createElement(
                  'h6',
                  null,
                  item.title
                )
              )
            )
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          music = _props.music,
          pageNumber = _props.pageNumber,
          loading = _props.loading,
          viewType = _props.viewType,
          filter = _props.filter;


      var path = this.props.path || "/music/";
      var per_page = this.props.per_page || 10;
      var pager = this.props.pager || "numbers";

      return _react2.default.createElement(
        'div',
        { className: "music music-" + viewType },
        this.renderMusic(loading, music.items, filter),
        _react2.default.createElement(_booshReactComponents.Pagination, { path: path, pager: pager, per_page: per_page, pageNumber: pageNumber, count: music.count })
      );
    }
  }]);
  return MusicCollection;
}(_react2.default.Component);
//import VideoThumb from '../Components/VideoThumb/VideoThumb'


/* Components */


/* Actions */

/* React */


MusicCollection.propTypes = {
  loading: _react2.default.PropTypes.bool,
  music: _react2.default.PropTypes.object,
  filter: _react2.default.PropTypes.string,
  pageNumber: _react2.default.PropTypes.number
};

MusicCollection.defaultProps = {
  viewType: 'grid',
  loading: true,
  filter: 'all',
  music: {},
  pageNumber: 1
};

exports.default = MusicCollection;