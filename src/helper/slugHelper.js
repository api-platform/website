const slugHelper = {
  slug(string) {
    return string.toLowerCase()
      .replace(/[^A-Za-z0-9\\-\\ \\_]/g, '')
      .replace(/ /g, '-');
  },
};

module.exports = slugHelper;
