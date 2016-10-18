import React, { Component, PropTypes } from 'react';
import path from 'path';
import AnchorJS from 'anchor-js';
import EditOnGithub from 'components/EditOnGithub';

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

  componentWillMount() {
    this.addAnchors();
  }

  componentDidUpdate() {
    this.addAnchors();
  }

  getHtml() {
    if (!this.props.currentPage || this.props.currentPage.isFetching ) {
      return {
        __html: ''
      };
    }

    return {
      __html: this.props.currentPage.data.text,
    };
  }

  addAnchors() {
    if (!__SERVER__) {
      (new AnchorJS()).add();
    }
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

    // handle relative urls only and page anchors
    if (/^(?:[a-z]+:)?\/\//i.test(url) || /^#/.test(url)) {
      return;
    }

    // prevent full page refresh
    event.preventDefault();

    // handle the case where last fragment is whether a directory or a file basename
    const basePath = this.props.selectedPage.substring(0, this.props.selectedPage.lastIndexOf('/') + 1);

    // finally use our spa's router
    this.props.navigateTo(path.join('/', basePath, url));
  }

  render() {
    if (this.props.currentPage.notFound) {
      return (<div className="error">Document not found.</div>);
    }

    return (
      // The HTML is properly sanitized by the Go JSON-LD generator.
      <section>
        <article className="page" onClick={this.captureClicks} dangerouslySetInnerHTML={this.getHtml()} />
        <EditOnGithub pagepath={this.props.currentDocumentPath} />
      </section>
    );
  }
}

Page.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  currentPage: PropTypes.any.isRequired,
  currentDocumentPath: PropTypes.string,
  params: PropTypes.object,
  navigateTo: PropTypes.func.isRequired,
};

export default Page;
