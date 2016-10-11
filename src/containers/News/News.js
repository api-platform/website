import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class News extends Component {
  componentDidMount() {
    if (__SERVER__ || typeof twttr === 'undefined') {
      return;
    }

    twttr.widgets.load(
      document.getElementById('news')
    );
  }

  render() {
    return (
      <div>
        <Helmet title="News"/>

        <div id="news" className="container">
          <h1>News <span className="fa fa-twitter" /></h1>
          <a className="twitter-timeline" data-link-color="#3faab4" href="https://twitter.com/ApiPlatform">Tweets by ApiPlatform</a>
        </div>
      </div>
    );
  }
}
