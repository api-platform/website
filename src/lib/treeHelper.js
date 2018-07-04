const slugHelper = require('./slugHelper');

const treeHelper = {
  getTree(tree, node, id) {
    if (!node.sections || !tree) {
      return tree;
    }

    return [...tree, ...node.sections.map((section) => {
      const toPush = {
        id: 'H1' !== section.heading.tagName ? slugHelper.slug(section.heading.innerHTML) : id,
        title: section.heading.innerHTML,
      };

      return 0 < treeHelper.getTree([], section).length ?
        { ...toPush, anchors: treeHelper.getTree([], section) } : toPush;
    })];
  },
};

module.exports = treeHelper;
