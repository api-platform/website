let parseNav = [];

function getNav(nav, currentPath, navItem) {
  if (!navItem.anchors) {
    return nav;
  }

  return [...nav, ...navItem.anchors.map((navSubItem) => {
    const subItemCurrentPath = `${currentPath}/${navSubItem.id}`;

    return {
      path: subItemCurrentPath,
      title: navSubItem.title,
      rootPath: navItem.title,
      items: getNav([], subItemCurrentPath, navSubItem),
    };
  })];
}

function parseNavItem(nav) {
  nav.forEach((navItem) => {
    const { path, title, items } = navItem;
    parseNav = [...parseNav, ...items.map(subItem => ({
      path: `docs/${path}/${subItem.id}`,
      title: subItem.title,
      rootPath: title,
      items: getNav([], path, subItem),
    }))];
  });
  return parseNav;
}

module.exports.parseNavItem = parseNavItem;
