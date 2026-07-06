const {visit} = require('unist-util-visit');

// Rewrites local /assets/... image references to the CDN when
// REACT_APP_CDN_URL is set. Must run via `beforeDefaultRemarkPlugins`.
//
// Two node shapes are handled:
// - mdast 'image' nodes, from ![]() syntax. These run through Docusaurus's
//   own transformImage plugin next, which would otherwise resolve the local
//   path into a hashed webpack asset - prefixing with the `pathname://`
//   escape hatch tells it to leave the (now CDN-absolute) url untouched.
// - mdxJsxFlowElement/mdxJsxTextElement 'img' nodes, from literal <img>
//   tags written with JSX syntax (e.g. self-closing, `style={{...}}`).
//   These never pass through transformImage, so the src attribute is
//   rewritten directly.
module.exports = function remarkCdnImages() {
  return function transformer(tree) {
    const cdnUrl = process.env.REACT_APP_CDN_URL;
    if (!cdnUrl) {
      return;
    }
    const base = cdnUrl.replace(/\/$/, '');

    visit(tree, 'image', (node) => {
      if (typeof node.url === 'string' && node.url.startsWith('/assets/')) {
        node.url = `pathname://${base}${node.url}`;
      }
    });

    visit(
      tree,
      ['mdxJsxFlowElement', 'mdxJsxTextElement'],
      (node) => {
        if (node.name !== 'img' || !Array.isArray(node.attributes)) {
          return;
        }
        const srcAttr = node.attributes.find(
          (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'src',
        );
        if (
          srcAttr &&
          typeof srcAttr.value === 'string' &&
          srcAttr.value.startsWith('/assets/')
        ) {
          srcAttr.value = `${base}${srcAttr.value}`;
        }
      },
    );
  };
};
