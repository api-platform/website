import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Page,
    NotFound,
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/**" component={App}>
      <IndexRoute component={Page}/>
{/*
      <Route component={Page} />
*/}

      { /* Catch all route */ }
      <Route path="/notfound" component={NotFound} status={404} />
    </Route>
  );
};
