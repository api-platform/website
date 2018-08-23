const GithubSlugger = require('github-slugger');

const slugger = new GithubSlugger();

const treeHelper = {
  getTree(node, id, tree) {
    if (!node.sections || !tree) return tree;

    return [
      ...tree,
      ...node.sections.map(section => {
        const toPush = {
          id: 'H1' === section.heading.tagName ? id : slugger.slug(section.heading.innerHTML),
          title: section.heading.innerHTML,
        };

        const innerTree = treeHelper.getTree(section, undefined, []);
        if (innerTree.length) {
          toPush.anchors = innerTree;
        }

        return toPush;
      }),
    ];
  },
};

module.exports = treeHelper;
