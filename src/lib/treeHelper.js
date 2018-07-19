const GithubSlugger = require('github-slugger');

const slugger = new GithubSlugger();

const treeHelper = {
  getTree(node, id, treeParam) {
    const tree = treeParam || [];
    if (!node.sections || !tree) return tree;

    return [...tree, ...node.sections.map((section) => {
      const toPush = {
        id: 'H1' === section.heading.tagName ? id : slugger.slug(section.heading.innerHTML),
        title: section.heading.innerHTML,
      };

      const innerTree = treeHelper.getTree(section);
      if (tree.length) {
        toPush.anchors = innerTree;
      }

      return toPush;
    })];
  },
};

module.exports = treeHelper;
