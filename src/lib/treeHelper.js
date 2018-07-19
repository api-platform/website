const GithubSlugger = require('github-slugger')
const slugger = new GithubSlugger()

const treeHelper = {
  getTree(node, id, tree) {
    if (typeof tree === 'undefined') tree = [];
    if (!node.sections || !tree) return tree;

    return [...tree, ...node.sections.map(section => {
      const toPush = {
        id: 'H1' === section.heading.tagName ? id : slugger.slug(section.heading.innerHTML),
        title: section.heading.innerHTML,
      };

      const tree = treeHelper.getTree(section);
      if (tree.length) {
          toPush.anchors = tree;
      }

      return toPush;
    })];
  },
};

module.exports = treeHelper;
