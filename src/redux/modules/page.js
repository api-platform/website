import { combineReducers } from 'redux';
import { getPage } from 'helpers/DataClient';
const cheerio = require('cheerio');


// load prismjs (code highlighting) only client side for now
// Loading it from server side and client side causes double
// code tokenization. To painful to fix it. rage quit.
let Prism;
if (!__SERVER__) {
  Prism = require('prismjs');
  (__PRISMJS_LANGUAGES__ || []).forEach(item => require('prismjs/components/prism-' + item));
}

// disabled (need a real DOMParser instance)
// const AnchorJS = require('anchor-js');

// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_PAGE = 'SELECT_PAGE';
export const REQUEST_PAGE = 'REQUEST_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';

// ------------------------------------
// Actions
// ------------------------------------
export function selectPage(pageName) {
  return {
    type: SELECT_PAGE,
    pageName
  };
}

export function requestPage(pageName) {
  return {
    type: REQUEST_PAGE,
    pageName
  };
}

export function receivePage(pageName, jsonldDoc, data) {
  const wrap = cheerio.load('' + data.text);

  wrap('a').each((index, anchor) => {
    const $anchor = wrap(anchor);
    const href = $anchor.attr('href');
    if (/^(?:[a-z]+:)?\/\//i.test(href)) {
            // Make absolute URLs in target blank
      $anchor.attr('target', '_blank');
    } else {
      // Convert relative JSON-LD URLs
      $anchor.attr('href', './' + href.replace(/index\.jsonld/, '').replace(/\.jsonld/, ''));
    }
  });

  wrap('img').each((index, image) => {
    const $image = wrap(image);
    const src = $image.attr('src');
        // Convert relative URLs
    if (!/^(?:[a-z]+:)?\/\//i.test(src)) {
      $image.attr('src', '/data/' + src);
    }
  });

  // Highlight code blocks
  if ( !__SERVER__) {
    wrap('code[class*="language-"]').each((index, code) => {
      const element = cheerio(code);
      const initialHtml = element.html();

      const language = element.attr('class')
                              .split(/\s+/)
                              .find(item => item.match(/^language-/))
                              .match(/-(.+)$/)[1]
                              ;

      if (__PRISMJS_LANGUAGES__.indexOf(language) >= 0) {
        element.html(Prism.highlight(initialHtml, Prism.languages[language]));
      }
    });

    // Add anchors
    // Does not work with cheerio. We need to instantiate a DOMParser
    // (new AnchorJS()).add(wrap('h2, h3, h4, h5, h6'));
  }

  return {
    type: RECEIVE_PAGE,
    pageName,
    data: {...data, text: wrap.html()}
  };
}

export function fetchPage(pageName) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

  return (dispatch) => {
    dispatch(requestPage(pageName));
    let jsonldDoc = pageName;
    if (jsonldDoc === '' || jsonldDoc.endsWith('/')) {
      jsonldDoc = jsonldDoc + 'index';
    }

    return getPage(`/data/${jsonldDoc}.jsonld`)
              .then(data => {
                dispatch(receivePage(pageName, jsonldDoc, data));
              })
              ;
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
function selectedPage(state = '', action) {
  switch (action.type) {
    case SELECT_PAGE:
      return action.pageName || '';
    default:
      return state;
  }
}

function pages(state = {}, action) {
  switch (action.type) {
    case REQUEST_PAGE:
      return Object.assign({}, state, {
        [action.pageName]: { isFetching: true, data: {} }
      });
    case RECEIVE_PAGE:
      return Object.assign({}, state, {
        [action.pageName]: { isFetching: false, data: action.data }
      });
    default:
      return state;
  }
}

const pageReducer = combineReducers({
  pages,
  selectedPage
});

export default pageReducer;

