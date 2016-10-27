'use strict';

export default {
  refresh: () => {
    if ('undefined' !== typeof window && 'undefined' !== typeof window.docsearch) {
      window.docsearch({
        apiKey: '3ec989b752d176d177da4cfe814eee11',
        indexName: 'api-platform',
        inputSelector: '#search',
        debug: false // Set debug to true if you want to inspect the dropdown
      });
    }
  }
}
