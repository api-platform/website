const slugs = require('github-slugger')();

const treeHelper = {
  getTree(tree, node, id) {
    if (!node.sections || !tree) {
      return tree;
    }

    return [...tree, ...node.sections.map((section) => {
      if ('H1' === section.heading.tagName) slugs.reset();
      const toPush = {
        id: 'H1' !== section.heading.tagName ? slugs.slug(section.heading.innerHTML) : id,
        title: section.heading.innerHTML,
      };

      return 0 < treeHelper.getTree([], section).length ?
        { ...toPush, anchors: treeHelper.getTree([], section) } : toPush;
    })];
  },
};

module.exports = treeHelper;
