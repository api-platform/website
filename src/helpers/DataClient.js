import superagent from 'superagent';
// import config from '../config';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return adjustedPath;
}

export function getPage(path) {
  return new Promise((resolve, reject) => {
    const toto = require('../static' + path);
    if (__SERVER__) {
      return resolve(toto);
    }
    const request = superagent.get(formatUrl(path));
    request.end((err, { body, text } = {}) => {
      if (err) return reject(body || err);
      return resolve(JSON.parse(body || text));
    });
  });
}

