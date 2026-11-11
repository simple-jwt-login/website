/** @type {import('@docusaurus/plugin-client-redirects').Options['redirects']} */
const redirects = [
  {
    from: '/docs/code_examples/php/register_and_get_jwt',
    to: '/docs/code-examples/register-and-get-jwt',
  },
  // Legacy v3 Google pages that used to live in the current docs.
  {from: '/docs/applications/google/setup', to: '/docs/3.0.0/applications/google/setup'},
  {from: '/docs/applications/google/login', to: '/docs/3.0.0/applications/google/login'},
  {from: '/docs/applications/google/oauth_code', to: '/docs/3.0.0/applications/google/oauth_code'},
  {from: '/docs/applications/google/id_token_to_wp_jwt', to: '/docs/3.0.0/applications/google/id_token_to_wp_jwt'},
  {from: '/docs/applications/google/shortcode', to: '/docs/3.0.0/applications/google/shortcode'},
  // Old standalone OAuth page, superseded by the OAuth integration docs.
  {from: '/docs/oauth', to: '/docs/integrations/oauth/'},
];

module.exports = redirects;
