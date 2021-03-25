const diacritics = require('diacritic');

const slugify = (value) =>
  diacritics
    .clean(value)
    .replace('?', '')
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-'); // separator

module.exports = slugify;
