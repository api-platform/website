/**
 * Generate an absolute link to the github file, in edit mode
 *
 * @param {string} documentPath - the unsuffixed path relative path of a document from the root of the doc tree
 * @returns {string}
 */
export function documentPathToGithubMarkdown(documentPath) {
  if (!__GITHUB_DOCUMENTATION_REPOSITORY__) {
    throw new Error('Github repository not configured');
  }

  return `https://github.com/${__GITHUB_DOCUMENTATION_REPOSITORY__}/edit/${__GITHUB_DOCUMENTATION_BRANCH__}/${documentPath}.md`;
}

