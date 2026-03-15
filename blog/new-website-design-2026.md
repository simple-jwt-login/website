# New Website Design: Faster, Smarter, and Easier to Navigate

March 11, 2026 ·

<!-- -->

2 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/blog/authors/nicumicle.md)

[Nicu Micle](/blog/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

We just shipped a major update to the Simple JWT Login website. The plugin hasn't changed — but everything around it has. From the homepage to the blog to the docs navigation, here's a look at what's new and why we made these changes.

## Refreshed UI[​](#refreshed-ui "Direct link to Refreshed UI")

The entire visual design has been overhauled. Every page — homepage, contact, donate, blog — now uses a consistent design language with refined typography, better spacing, and clear calls to action.

The homepage in particular got a lot of attention. Feature cards now have sharper copy that explains *what the feature does* rather than just naming it. The stats section (active installs, downloads, ratings) gives newcomers quick confidence, and the CTA buttons are more prominent.

The blog also has a custom layout: post cards show the author, date, tags, and a description at a glance — no more barebones list.

## Built-in Search[​](#built-in-search "Direct link to Built-in Search")

The site now has **full-text local search** powered by [`@easyops-cn/docusaurus-search-local`](https://github.com/easyops-cn/docusaurus-search-local). It indexes docs and blog posts, works entirely client-side (no external service), and is available from any page.

If you've ever tried to find a specific configuration option or remember which doc covers token revocation — just search for it now.

## LLMs.txt Support[​](#llmstxt-support "Direct link to LLMs.txt Support")

The site now generates an `llms.txt` file (and `llms-full.txt`) via the [`@signalwire/docusaurus-plugin-llms-txt`](https://github.com/signalwire/docusaurus-plugin-llms-txt) plugin. This is a [community standard](https://llmstxt.org/) for making documentation AI-friendly.

If you're using an AI assistant to help integrate Simple JWT Login into your app, it can now read structured, clean content from this site rather than parsing raw HTML.

## Release Notes[​](#release-notes "Direct link to Release Notes")

The [Releases](/releases.md) section is now live with structured changelogs for recent plugin versions (3.6.2, 3.6.3, 3.6.4, 3.6.5). Going forward, every plugin release will have a corresponding entry there.

***

The plugin itself hasn't changed — but if you haven't visited the docs in a while, it's worth a look. And if you run into anything that feels off or missing, [open an issue on GitHub](https://github.com/nicumicle/simple-jwt-login/issues).

**Tags:**

* [News](/blog/tags/tags/news.md "Plugin news")
* [WordPress Plugin](/blog/tags/tags/wordpress-plugin.md "WordPress plugin tips, features, and usage guides")

[Edit this page](https://github.com/simple-jwt-login/website/tree/main/blog/2026-03-11-new-website-design.md)
