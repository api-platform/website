/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const visit = require('unist-util-visit');
const remarkMacro = require('remark-macro')();

remarkMacro.addMacro('codeSelector', (content, props, { transformer, eat }) => ({
  type: 'CodeSelectorNode',
  children: transformer.tokenizeBlock(content, eat.now()),
}));

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'CodeSelectorNode', (node) => {
    let html = '';
    let toolbarHtml = '';
    let firstCodeNode = true;
    node.children.forEach((codeNode) => {
      if ('code' === codeNode.type) {
        console.warn(
          'code inside [codeSelector] has not been parsed yet, have you defined `gatsby-remark-code-selector` after `gatsby-remark-prismjs`?'
        );
        return;
      }
      if ('html' !== codeNode.type || !codeNode.lang) {
        console.warn('content inside [codeSelector] should only be parsed code, received:\n', codeNode);
        return;
      }
      html += `<div class="code-selector-code-${codeNode.lang}" style="${firstCodeNode ? '' : 'display: none'}">${
        codeNode.value
      }</div>`;
      toolbarHtml += `<button type="button" class="code-selector-select-${codeNode.lang} ${
        firstCodeNode ? 'selected' : ''
      }">${codeNode.lang}</button>`;
      firstCodeNode = false;
    });

    node.type = 'html';
    node.children = undefined;
    node.value = `
      <div class="code-selector">
          <div class="code-selector-toolbar">
              ${toolbarHtml}
          </div>
          ${html}
      </div>
    `;
  });

  return markdownAST;
};

module.exports.setParserPlugins = () => [remarkMacro.transformer];
