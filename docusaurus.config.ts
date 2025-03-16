import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// note that parts of the complete config were left out for brevity
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";


require('dotenv').config()

const config: Config = {
  title: 'Simple-JWT-Login',
  tagline: 'Your WordPress plugin that allows you to work with JWT',
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
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

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
      },
    ],

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api-docs',
        path: 'api',
        routeBasePath: 'api',
        docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        // sidebarPath: './sidebarsCommunity.js',
        // ... other options
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
          return items.filter((item) => !item.url.includes('/page/'));
        },
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "opeanapi-1", // plugin id
        docsPluginId: "api-docs", // configured for preset-classic
        config: {
          apiv1: {
            specPath: "static/openapi.yaml",
            outputDir: "./api",
            showSchemas: false,
            baseUrl: "/api", // Leading slash is important
            sidebarOptions: {
              groupPathsBy: "tag",
              // categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ],

  ],

  themes: ["docusaurus-theme-openapi-docs"], // export theme components

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/docs/',
          sidebarPath: './sidebars.ts',
          editUrl:  'https://github.com/simple-jwt-login/website/tree/main',
          //docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: {
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
          postsPerPage: 6, // or "ALL"
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
    announcementBar: {
      id: 'support_us',
      content:
          '⭐️ If you like Simple-JWT-Login, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/nicumicle/simple-jwt-login">GitHub</a>.',
      backgroundColor: '#42b983',
      textColor: '#091E42',
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
          label: 'Blog',
          position: 'left',
          to: '/blog/',
          title: 'Blog',
        },
        {
          label: 'Releases',
          position: 'left',
          to: '/releases/',
          title: 'Releases',
        },
        {
          label: 'API',
          position: 'left',
          to: '/api/simple-jwt-login',
          title: 'API',
        },
        {
          label: 'Donate',
          position: 'right',
          title: 'Donate',
          to: '/donate/',
        },
        {
          label: 'Contact Us',
          position: 'right',
          title: 'Contact Us',
          to: '/contact/',
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
        },
        {
          href: 'https://discord.gg/c4AeefD8Dr',
          position: 'right',
          className: 'header-discord-logo',
          'aria-label': 'Discord',
          title: 'Discord',
        },
        {
          href: 'https://twitter.com/simplejwtlogin',
          position: 'right',
          className: 'header-twitter-logo',
          'aria-label': 'Follow us on X (Twitter)',
          title: 'Follow us',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Quick Links',
          items: [
            {
              label: 'WordPress plugin',
              href: 'https://wordpress.org/plugins/simple-jwt-login',
              title: "WordPress plugin"
            },
            {
              label: 'GitHub repository',
              href: 'https://github.com/nicumicle/simple-jwt-login',
              title: 'GitHub repository',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nicumicle/simple-jwt-login/issues',
              title: "GitHub",
            },
            {
              label: 'Support forum',
              href: 'https://wordpress.org/support/plugin/simple-jwt-login',
              title: 'Support forum',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'X.com',
              href : 'https://x.com/simplejwtlogin',
              title: 'X.com',
            },
            {
              label: 'GitHub',
              href : 'https://github.com/nicumicle/simple-jwt-login/stargazers',
              title: 'GitHub',
            },
            {
              label: "Discord",
              href: "https://discord.gg/c4AeefD8Dr",
              title: "Discord",
            }
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'php'], // https://prismjs.com/#supported-languages
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
