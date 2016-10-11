import superagent from 'superagent';
// import config from '../config';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return adjustedPath;
}

export function getPage(path) {
  return new Promise((resolve, reject) => {
    const doc = require('../static' + path);
    if (__SERVER__) {
      if (!doc) {
        return reject(`Document "${path}" not found.`);
      }
      return resolve(doc);
    }
    const request = superagent.get(formatUrl(path));
    request.end((err, { text } = {}) => {
      if (err) return reject(err);
      return resolve(JSON.parse(text));
    });
  });
}
