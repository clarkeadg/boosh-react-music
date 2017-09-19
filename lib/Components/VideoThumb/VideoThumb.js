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

var _reactFoundation = require('react-foundation');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Components */
var VideoThumb = function (_React$Component) {
  (0, _inherits3.default)(VideoThumb, _React$Component);

  function VideoThumb() {
    (0, _classCallCheck3.default)(this, VideoThumb);
    return (0, _possibleConstructorReturn3.default)(this, (VideoThumb.__proto__ || (0, _getPrototypeOf2.default)(VideoThumb)).apply(this, arguments));
  }

  (0, _createClass3.default)(VideoThumb, [{
    key: 'render',
    value: function render() {
      //console.log('111111', this.props)
      var video = this.props.video;

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

      return _react2.default.createElement(
        _reactRouter.Link,
        { to: '/video/' + video.title.label },
        _react2.default.createElement(
          _reactFoundation.MediaObject,
          null,
          _react2.default.createElement(
            _reactFoundation.MediaObjectSection,
            null,
            _react2.default.createElement(_reactFoundation.Thumbnail, { src: video["im:image"][video["im:image"].length - 1].label })
          ),
          _react2.default.createElement(
            _reactFoundation.MediaObjectSection,
            { isMain: true },
            _react2.default.createElement(
              'h6',
              null,
              video.title.label
            ),
            _react2.default.createElement('p', null)
          )
        )
      );
    }
  }]);
  return VideoThumb;
}(_react2.default.Component);
/* React */


exports.default = VideoThumb;