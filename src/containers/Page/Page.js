import React, { Component, PropTypes } from 'react';
import path from 'path';

if (!__SERVER__) {
  // @TODO: Find a way to load prisms css during server side rendering
  require('prismjs/themes/prism.css');
}

// TODO: use https://github.com/reactjs/react-magic/blob/master/README-htmltojsx.md

class Page extends Component {

    constructor(props) {
      super(props);
      this.captureClicks = this.captureClicks.bind(this);
    }

    getHtml() {
      if (!this.props.pages[this.props.selectedPage] || this.props.pages.isFetching ) {
        return {
          __html: ''
        };
      }

      return {
        __html: this.props.pages[this.props.selectedPage].data.text,
      };
    }

    /**
     * Manually capture clicks on links to prevent full page refresh
     */
    captureClicks(event) {
      const target = event.target;

      // handle "a" tag only
      if (target.tagName.toLowerCase() !== 'a') {
        return;
      }

      const url = target.getAttribute('href');

      // handle relative urls only
      if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return;
      }

      // prevent full page refresh
      event.preventDefault();

      // handle the case where last fragment is wether a directory or a file basename
      const separator = (this.props.selectedPage.match(/\/$/)) ? '.' : '..';

      // finally use our spa's router
      this.props.navigateTo(path.join('/', this.props.selectedPage, separator, url));
    }

    render() {
      return (
          // The HTML is properly sanitized by the Go JSON-LD generator.
          <article className="page" onClick={this.captureClicks} dangerouslySetInnerHTML={this.getHtml()} />
        );
    }
}

Page.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  params: PropTypes.object,
  pages: PropTypes.object,
  navigateTo: PropTypes.func.isRequired,
};

export default Page;
