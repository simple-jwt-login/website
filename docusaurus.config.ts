import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
const redirects = require('./redirects.js');

// note that parts of the complete config were left out for brevity
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";


require('dotenv').config()

const config: Config = {
  title: 'Simple JWT Login',
  tagline: 'Free WordPress JWT authentication plugin - REST API, headless WP, WPGraphQL & more',
  favicon: '/assets/favicons/favicon.ico',

  // Set the production url of your site here
  url: process.env.REACT_APP_DOMAIN,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl:  process.env.REACT_APP_BASE_URL,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'simple-jwt-login', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  trailingSlash: false,
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Exposed to the client bundle. Google Analytics is only loaded once the
  // visitor accepts the cookie consent banner - see src/theme/Root.jsx and
  // src/utils/analytics.js.
  //
  // cdnUrl: when set, images are served from this CDN instead of /static -
  // see src/utils/cdn.js (JSX images) and plugins/rehype-cdn-images.js
  // (markdown/MDX images in docs, blog, releases, and API reference).
  customFields: {
    gaMeasurementId: process.env.REACT_APP_GA_MEASUREMENT_ID || '',
    cdnUrl: process.env.REACT_APP_CDN_URL || '',
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: [
       'en',
      //  'de'
      ],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
      },
    },
  },

  plugins: [
    [
      'docusaurus-plugin-dotenv',
      {
          path: "./.env", 
          systemvars: true, 
      }
    ],

  
    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'releases',
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: 'releases',
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: './releases',
        blogSidebarCount: "ALL",
        postsPerPage: 6,
        blogTitle: 'Releases',
        rehypePlugins: [require('./plugins/rehype-cdn-images')],
        beforeDefaultRemarkPlugins: [require('./plugins/remark-cdn-images')],
      },
    ],

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api-docs',
        path: 'api/v4',
        routeBasePath: 'api/v4',
        docItemComponent: "@theme/ApiItem",
        sidebarPath: './api/v4/sidebar.ts',
        rehypePlugins: [require('./plugins/rehype-cdn-images')],
        beforeDefaultRemarkPlugins: [require('./plugins/remark-cdn-images')],
      },
    ],

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api-docs-v3',
        path: 'api/v3',
        routeBasePath: 'api/v3',
        docItemComponent: "@theme/ApiItem",
        rehypePlugins: [require('./plugins/rehype-cdn-images')],
        beforeDefaultRemarkPlugins: [require('./plugins/remark-cdn-images')],
      },
    ],


    [
      '@docusaurus/plugin-sitemap',
      {
        id: "sitemap",
        lastmod: 'datetime',
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
        filename: 'sitemap.xml',
        createSitemapItems: async (params) => {
          const {defaultCreateSitemapItems, ...rest} = params;
          const items = await defaultCreateSitemapItems(rest);
          return items
            .filter((item) => !item.url.includes('/page/'))
            .map((item) => {
              const url = item.url;
              // Homepage gets highest priority
              if (url === rest.siteConfig.url || url === rest.siteConfig.url + '/') {
                return { ...item, priority: 1.0, changefreq: 'weekly' };
              }
              // Current major-release landing page
              if (url.endsWith('/v4') || url.endsWith('/v4/')) {
                return { ...item, priority: 0.9, changefreq: 'weekly' };
              }
              // Old, unmaintained doc versions - keep indexable but deprioritize so
              // they don't compete with current docs for the same search queries.
              if (/\/docs\/\d+\.\d+\.\d+\//.test(url)) {
                return { ...item, priority: 0.3, changefreq: 'yearly' };
              }
              // Core doc pages
              if (url.includes('/docs/')) {
                return { ...item, priority: 0.8, changefreq: 'monthly' };
              }
              // Blog posts are regularly updated
              if (url.includes('/blog/')) {
                return { ...item, priority: 0.7, changefreq: 'monthly' };
              }
              // Release notes - same value as blog posts
              if (url.includes('/releases/')) {
                return { ...item, priority: 0.7, changefreq: 'monthly' };
              }
              // Ecosystem, demos, and other product pages
              if (/\/(ecosystem|demos)(\/|$)/.test(url)) {
                return { ...item, priority: 0.7, changefreq: 'monthly' };
              }
              // API reference
              if (url.includes('/api/')) {
                return { ...item, priority: 0.6, changefreq: 'monthly' };
              }
              return { ...item, priority: 0.5 };
            });
        },
      },
    ],
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        siteDescription: 'Simple JWT Login is a free, open-source WordPress plugin that adds JWT authentication to the WordPress REST API. Supports login, register, auto-login, endpoint protection, token refresh, and more.',
        depth: 3,
        content: {
          enableLlmsFullTxt: true,
          includeBlog: true,
          includePages: false,
        },
      },
    ],

    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "openapi-v4",
        docsPluginId: "api-docs",
        config: {
          apiv4: {
            specPath: "static/openapi/v4.yaml",
            outputDir: "./api/v4",
            showSchemas: false,
            baseUrl: "/api/v4",
            showExtensions: true,
            showInfoPage: true,
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ],

    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "openapi-v3",
        docsPluginId: "api-docs-v3",
        config: {
          apiv3: {
            specPath: "static/openapi/v3.yaml",
            outputDir: "./api/v3",
            showSchemas: false,
            baseUrl: "/api/v3",
            showExtensions: true,
            showInfoPage: true,
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ],


    [
      '@docusaurus/plugin-client-redirects',
      { redirects },
    ],

    [
      function webpackPolyfillPlugin() {
        return {
          name: 'webpack-polyfill-plugin',
          configureWebpack(config, isServer) {
            if (!isServer) {
              return {
                resolve: {
                  fallback: {
                    path: require.resolve('path-browserify'),
                  },
                },
              };
            }
            return {};
          },
        };
      },
      {},
    ],

  ],

  themes: [
    "docusaurus-theme-openapi-docs",
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexBlog: true,
        indexPages: false,
        language: "en",
        searchBarShortcutHint: false,
      },
    ],
  ],
  // stylesheets: [
  //   {
  //     href: "https://use.fontawesome.com/releases/v5.11.0/css/all.css",
  //     type: "text/css",
  //   },
  // ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/docs/',
          sidebarPath: './sidebars.ts',
          editUrl:  'https://github.com/simple-jwt-login/website/tree/main',
          //docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          rehypePlugins: [require('./plugins/rehype-cdn-images')],
          beforeDefaultRemarkPlugins: [require('./plugins/remark-cdn-images')],
          lastVersion: 'current',
          versions: {
            current: {
              label: '4.x',
              badge: true,
            },
            '3.0.0': {
              label: '3.x',
              badge: true,
              banner: 'unmaintained',
            },
          },
        },
        blog: {
          rehypePlugins: [require('./plugins/rehype-cdn-images')],
          beforeDefaultRemarkPlugins: [require('./plugins/remark-cdn-images')],
          showReadingTime: true,
          feedOptions: {
            xslt: true,
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Simple-JWT-Login.`,
          },
          blogTitle: 'Simple-JWT-Login blog!',
          blogDescription: 'News and tutorials about Simple-JWT-Login',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 0, //'ALL'
          postsPerPage: 8, // or "ALL"
          editUrl:
            'https://github.com/simple-jwt-login/website/tree/main',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',

        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Delimiter between page title and site name in <title> tags
    titleDelimiter: '-',
    // Global <head> metadata (Open Graph, Twitter Card, keywords)
    metadata: [
      { name: 'keywords', content: 'JWT, WordPress plugin, JWT authentication, WordPress REST API, headless WordPress, JSON Web Token, WPGraphQL, JWT login, auto login, token-based authentication' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@simplejwtlogin' },
      { name: 'twitter:creator', content: '@simplejwtlogin' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Simple JWT Login' },
      { property: 'og:image', content: '/assets/favicons/android-chrome-192x192.png' },
    ],
    announcementBar: {
      id: 'support_us',
      content:
          '⭐️ If you like Simple-JWT-Login, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/nicumicle/simple-jwt-login">GitHub</a>.',
      backgroundColor: '#1d5e41',
      textColor: '#d4f5e5',
      isCloseable: true,
    },
    image: 'assets/favicons/android-chrome-192x192.png',
    navbar: {
      title: 'Simple JWT Login',
      logo: {
        alt: 'Simple-JWT-Login Logo',
        src: '/assets/favicons/favicon.ico',
        srcDark: '/assets/favicons/favicon.ico',
        href: '/',
        target: '_self',
        width: 32,
        height: 32,
      },
      items: [
        {
          label: 'Docs',
          position: 'left',
          to: '/docs/',
          title: 'Docs',
        },
        {
          type: 'custom-ApiVersionLink',
          position: 'left',
        },
        {
          label: 'Blog',
          position: 'left',
          to: '/blog/',
          title: 'Blog',
        },
        {
          label: 'Ecosystem',
          position: 'left',
          to: '/ecosystem/',
          title: 'Ecosystem',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'left',
        // },
        {
          href: 'https://github.com/nicumicle/simple-jwt-login',
          position: 'right',
          className: 'header-github-logo',
          'aria-label': 'GitHub',
          title: 'GitHub',
        }
      ],
    },
    footer: {
      style: 'dark',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'php'], // https://prismjs.com/#supported-languages
    },
  } satisfies Preset.ThemeConfig,

};

export default config;
