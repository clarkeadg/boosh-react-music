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

var _MusicSelector = require('../../Selectors/MusicSelector');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GetVideoThumb = function (_React$Component) {
  (0, _inherits3.default)(GetVideoThumb, _React$Component);

  function GetVideoThumb() {
    (0, _classCallCheck3.default)(this, GetVideoThumb);
    return (0, _possibleConstructorReturn3.default)(this, (GetVideoThumb.__proto__ || (0, _getPrototypeOf2.default)(GetVideoThumb)).apply(this, arguments));
  }

  (0, _createClass3.default)(GetVideoThumb, [{
    key: 'getData',
    value: function getData(video_id) {
      //console.log('GET USER',user_id)
      var Meta = {
        id: video_id
      };
      this.props.dispatch(_Creators2.default.getMusicAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.video_id) return;
      this.getData(this.props.video_id);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.video_id !== this.props.video_id) {
        this.getData(newProps.video_id);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      //console.log('111111', this.props)
      var item = this.props.item;

      if (!item) return false;

      return _react2.default.createElement(
        _reactRouter.Link,
        { className: 'videothumb', to: '/video/' + item.title + '/all' },
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
      );
    }
  }]);
  return GetVideoThumb;
}(_react2.default.Component);

/* Components */
//import { MediaObject, MediaObjectSection, Thumbnail } from 'react-foundation'

/* React */


GetVideoThumb.propTypes = {
  item: _react2.default.PropTypes.object
};

GetVideoThumb.defaultProps = {
  item: {}
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    item: (0, _MusicSelector.getVideoById)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(GetVideoThumb);