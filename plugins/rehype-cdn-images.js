const {visit} = require('unist-util-visit');

// Rewrites local /assets/... image src to the CDN when REACT_APP_CDN_URL is
// set. Runs at build time over compiled markdown/MDX, so it covers both
// ![]() image syntax and raw <img> tags. External URLs are left untouched.
module.exports = function rehypeCdnImages() {
  return function transformer(tree) {
    const cdnUrl = process.env.REACT_APP_CDN_URL;
    if (!cdnUrl) {
      return;
    }
    const base = cdnUrl.replace(/\/$/, '');
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') {
        return;
      }
      const src = node.properties && node.properties.src;
      if (typeof src === 'string' && src.startsWith('/assets/')) {
        node.properties.src = `${base}${src}`;
      }
    });
  };
};
