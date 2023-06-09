const cpr = require("cpr");
const path = require("path");

cpr(path.join(__dirname, 'node_modules/shiki/themes'), path.join(__dirname, '.next/standalone/node_modules/shiki/themes'), function(err: any, files: any) {
  err && console.error(err)
});

cpr(path.join(__dirname, 'node_modules/shiki/languages'), path.join(__dirname, '.next/standalone/node_modules/shiki/languages'), function(err: any, files: any) {
  err && console.error(err)
});

