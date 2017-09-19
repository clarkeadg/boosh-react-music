
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import List from './Containers/List'
import Video from './Containers/Video'

export default () => {
  const routes = (
    <Route path="/music">
      <IndexRoute component={List} />
      <Route path=":filter" component={List} />
      <Route path="video/:videoTitle" component={Video} />
    </Route>
  );
  return routes;
};
