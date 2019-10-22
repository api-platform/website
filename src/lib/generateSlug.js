function generateSlug(data, parent, isAnchor) {
  const result = [...data];
  const basePath = '/docs';

  result.map(item => {
    if (parent && parent.path && item.path) {
      item.path = `${parent.path}/${item.path}`;
    }

    if (item.anchors || !item.items) {
      item.slug = `${basePath}/${parent.path}/${'index' === item.id ? '' : item.id}`;
    }

    if (isAnchor) {
      item.slug = `${parent.slug}/#${item.id}`;
    }

    item.items && generateSlug(item.items, item);
    item.anchors && generateSlug(item.anchors, item, true);

    return item;
  });

  return result;
}

module.exports = generateSlug;
