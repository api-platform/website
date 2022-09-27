import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DocSearch } from '@docsearch/react';
import { currentVersion } from '../../../constants';
import '@docsearch/css';

const Search = ({ className }) => {
  return (
    <div className={classNames('search', className)}>
      <DocSearch
        appId={process.env.GATSBY_DOCSEARCH_APP_ID}
        apiKey={process.env.GATSBY_DOCSEARCH_API_KEY}
        indexName={process.env.GATSBY_DOCSEARCH_INDEX_NAME}
        searchParameters={{
          facetFilters: [`version:v${currentVersion}`],
        }}
        placeholder="Search..."
      />
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

export default Search;
