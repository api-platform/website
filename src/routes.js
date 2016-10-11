import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Page,
  Home,
  Dl,
  News,
  Support,
  NotFound,
} from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/docs/**" component={Page} />
      <Route path="/download" component={Dl} />
      <Route path="/news" component={News} />
      <Route path="/support" component={Support} />
      { /* Catch all route */ }
      <Route path="/notfound" component={NotFound} status={404} />
    </Route>
  );
};
