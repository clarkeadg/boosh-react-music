"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoByTitle = exports.getNav = exports.getFilter = exports.getVisibleiTunes = undefined;

var _reselect = require("reselect");

/* Private */

var alliTunes = function alliTunes(state, props) {
  return state.itunes;
};

var filter = function filter(state, props) {
  return props.routeParams.filter || "all";
};

var title = function title(state, props) {
  return props.title;
};

var nav = function nav(state, props) {
  return [{ "title": "All", "url": "/music/all" }, { "title": "Alternative", "url": "/music/alternative" }, { "title": "Country", "url": "/music/country" }, { "title": "Dance", "url": "/music/dance" }, { "title": "Electronic", "url": "/music/electronic" }, { "title": "Latino", "url": "/music/latino" }, { "title": "Pop", "url": "/music/pop" }, { "title": "Rap", "url": "/music/rap" }, { "title": "Rock", "url": "/music/rock" }, { "title": "Soul", "url": "/music/soul" }];
};

/* Export */

var getVisibleiTunes = exports.getVisibleiTunes = (0, _reselect.createSelector)([alliTunes], function (itunes) {
  if (!itunes || !itunes.result) return [];
  return itunes.result.map(function (id) {
    return itunes.entities[id];
  });
});

var getFilter = exports.getFilter = (0, _reselect.createSelector)([filter], function (key) {
  return key;
});

var getNav = exports.getNav = (0, _reselect.createSelector)([nav], function (rs) {
  return rs;
});

var getVideoByTitle = exports.getVideoByTitle = (0, _reselect.createSelector)([alliTunes, title], function (itunes, name) {
  //console.log(itunes, id)
  var rs = null;
  itunes.result.map(function (id) {
    //console.log(itunes.entities[id].title.label, name)
    if (itunes.entities[id].title.label == name) {
      rs = itunes.entities[id];
    }
  });
  return rs;
});