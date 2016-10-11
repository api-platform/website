import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

export default class Download extends Component {
  render() {
    return (
      <div>
        <Helmet title="Download"/>

        <div id="download" className="container">
          <h1>API Platform Distribution</h1>

          <a className="btn btn-primary btn-lg" role="button" href="https://api.github.com/repos/api-platform/api-platform/zipball">Download API Platform <span className="fa fa-download" /></a>

          <p>Then, read the <Link to="/docs/distribution/">getting started guide</Link> to create your first API in a few minutes.</p>

          <p>Old versions <a href="https://github.com/api-platform/api-platform/releases" target="_blank">can be downloaded from GitHub</a>.</p>
        </div>
      </div>
    );
  }
}
