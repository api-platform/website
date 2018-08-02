const fs = require('fs');
const { markdown } = require('markdown');
const path = require('path');

const fileContentHelper = {
  getFileContent(filePath, id) {
    const fileUrl = path.resolve(__dirname, `../pages/docs/${filePath}/${id}.md`);
    const content = fs
      .readFileSync(fileUrl)
      .toString()
      .replace(/([^`])(`)([^`])/gm, '$1$3')
      .replace(/```(|yaml|xml|php|json|javascript|sh)[^`]*```/gm, '');

    return markdown.toHTML(content);
  },
};

module.exports = fileContentHelper;
