const GithubSlugger = require('github-slugger');

const treeHelper = {
  getTree(node, id, tree) {
    if (!node.sections || !tree) return tree;

    const slugger = new GithubSlugger();

    return [
      ...tree,
      ...node.sections.map(section => {
        const toPush = {
          id: 'H1' === section.heading.tagName ? id : slugger.slug(section.heading.textContent),
          title: section.heading.textContent,
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
