const fs = require('fs');
const { markdown } = require('markdown');
const path = require('path');

const fileContentHelper = {
  getFileContent(filePath, id) {
    const content = fs
      .readFileSync(path.resolve(path.join(filePath, `${id}.md`)))
      .toString()
      .replace(/([^`])(`)([^`])/gm, '$1$3')
      .replace(/```(|yaml|xml|php|json|javascript|sh)[^`]*```/gm, '');

    return markdown.toHTML(content);
  },
};

module.exports = fileContentHelper;
