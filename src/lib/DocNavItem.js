class DocNavItem {
  constructor({ item, parent = null, level = 0, isAnchor = false }) {
    this.title = item.title;
    this.parent = parent;
    this.level = level;
    this.children = [];
    this.isAnchor = isAnchor;
    this.isDirectory = 'path' in item;
    this.isPage = 'id' in item && false === this.isAnchor;
    this.isLink = this.isPage || this.isAnchor;
    this.path = this.getPath(item);
    this.uri = this.getUri(item);
    if ('undefined' !== typeof item.items) {
      item.items.forEach(child => this.children.push(new DocNavItem({ item: child, parent: this, level: level + 1 })));
    }
    if ('undefined' !== typeof item.anchors) {
      item.anchors.forEach(child =>
        this.children.push(new DocNavItem({ item: child, parent: this, level: level + 1, isAnchor: true }))
      );
    }
    this.active = false;
    this.hasSubLevels = 0 !== this.children.length;
  }

  getPath(item) {
    if (true === this.isDirectory) {
      return `${item.path}/`;
    }

    if (true === this.isAnchor) {
      return `#${item.id}`;
    }

    if ('index' === item.id) {
      return '';
    }

    return `${item.id}/`;
  }

  getUri(item) {
    if (null === this.parent) {
      return `/${this.getPath(item)}`;
    }

    return `${this.parent.uri}${this.getPath(item)}`;
  }

  activate() {
    this.active = true;
    if (null !== this.parent) {
      this.parent.activate();
    }
  }

  activateFromUri(uri) {
    if (this.uri === uri) {
      this.activate();
    } else {
      this.children.forEach(child => child.activateFromUri(uri));
    }
  }
}

export default DocNavItem;
