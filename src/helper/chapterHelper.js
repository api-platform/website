const chapterHelper = {
  processChapterItems(chapter, fileProcessor) {
    const items = chapter.items.map(file => fileProcessor.processFile(chapter.path, file.id)[0]);

    return items.map((item, index) => this.processChapterItem(chapter.path, item, index)).join('');
  },
  processChapterItem(path, item, index) {
    return `${index + 1}.${(index + 1).toString().length !== 2 ? '  ' : ' '}[${item.title}](${path}/${item.id}.md)\n${this.processItemAnchors(item, path) ? this.processItemAnchors(item, path) : ''}`;
  },
  processItemAnchors(item, path, depth = 2) {
    if (!item.anchors) {
      return;
    }

    return item.anchors.map((anchor, index) => this.processItemAnchor(anchor, path, index, depth)).join('');
  },
  processItemAnchor(anchor, path, index, depth) {
    return `${'  '.repeat(depth)}${index + 1}.${(index + 1).toString().length !== 2 ? '  ' : ' '}[${anchor.title}](${path}#${anchor.id})\n${anchor.anchors ? this.processItemAnchors(anchor, path , ++depth) : ''}`;
  },
  processChapter(chapter, fileProcessor) {
    return `## ${chapter.title}\n\n${this.processChapterItems(chapter, fileProcessor)}`;
  },
};

module.exports = chapterHelper;
