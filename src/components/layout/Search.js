import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Search extends React.Component {
  /* eslint-disable no-undef */
  componentDidMount() {
    if (docsearch) {
      docsearch({
        apiKey: process.env.GATSBY_DOCSEARCH_API_KEY,
        indexName: process.env.GATSBY_DOCSEARCH_INDEX_NAME,
        inputSelector: this.searchInput,
        debug: false,
      });
    }
  }
  /* eslint-enable no-undef */

  render() {
    const { className } = this.props;

    return (
      <div className={classNames('search', className)}>
        <i className="icon-search search__icon" />
        <form>
          <input
            ref={(input) => {
              this.searchInput = input;
            }}
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
};

Search.defaultProps = {
  className: '',
};

export default Search;
