import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scriptLoader from 'react-async-script-loader';
import { currentVersion } from '../../../constants';

class Search extends React.Component {
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        this.initDocSearch();
      }
    }
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.initDocSearch();
    }
  }
  /* eslint-disable no-undef */
  initDocSearch() {
    if (docsearch) {
      docsearch({
        apiKey: process.env.GATSBY_DOCSEARCH_API_KEY,
        indexName: process.env.GATSBY_DOCSEARCH_INDEX_NAME,
        inputSelector: this.searchInput,
        debug: false,
        algoliaOptions: { facetFilters: [`version:v${currentVersion}`] },
      });
    }
  }
  /* eslint-enable no-undef */

  onSearchClick = () => {
    this.searchInput.focus();
  };

  render() {
    const { className, onFocus, onBlur } = this.props;

    return (
      <div className={classNames('search', className)}>
        <button className="icon-search search__icon" onClick={this.onSearchClick} title="Search docs" />
        <form>
          <input
            ref={input => {
              this.searchInput = input;
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            className="search__input"
            type="search"
            placeholder="SEARCH..."
          />
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  className: PropTypes.string,
  isScriptLoaded: PropTypes.bool.isRequired,
  isScriptLoadSucceed: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

Search.defaultProps = {
  className: '',
};

export default scriptLoader('https://cdn.jsdelivr.net/docsearch.js/2.5/docsearch.min.js')(Search);
