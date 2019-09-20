const { current, currentVersion } = require('../../constants');

const versionHelper = {
  getOriginalVersion(transformedVersion) {
    return transformedVersion
      .replace(/v|\//g, '')
      .replace(current, currentVersion)
    ;
  },
  getPrefixedVersion(version) {
    return (Number.isNaN(Number(version)) ? version : `v${version}`);
  },
  generateSlugPreviousChapter(prefixedVersionSlug, section, chapterPrevious) {
    return  'index' === chapterPrevious
      ? `/docs/${prefixedVersionSlug}${section}/`
      : `/docs/${prefixedVersionSlug}${section}/${chapterPrevious}/`;
  },
  generateSlugNextChapter(prefixedVersionSlug, section, chapterNext) {
    return `/docs/${prefixedVersionSlug}${section}/${chapterNext}/`;
  },
  generateSlugEditDocumentation(originalVersion, section, article) {
    if (section) {
      return `https://github.com/api-platform/docs/edit/${originalVersion}/${section}/${article}.md`;
    }

    return `https://github.com/api-platform/docs/edit/${originalVersion}/${article}.md`;
  },
};

module.exports = versionHelper;
