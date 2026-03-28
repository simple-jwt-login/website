/**
 * Swizzled BlogListPage — modern hero header + grid layout.
 * Applies to both /blog/ and /releases/.
 */
import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faPenNib } from '@fortawesome/free-solid-svg-icons';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import type {Props} from '@theme/BlogListPage';
import styles from './styles.module.css';

function BlogListPageMetadata(props: Props): JSX.Element {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogHero({metadata}: {metadata: Props['metadata']}) {
  const isReleases = metadata.permalink.startsWith('/releases');
  const totalCount = metadata.totalCount ?? 0;

  return (
    <div className={styles.hero}>
      <div className={styles.heroBadge}>
        <FontAwesomeIcon icon={isReleases ? faBox : faPenNib} />
        {isReleases ? ' Changelog' : ' Blog'}
      </div>
      <h1 className={styles.heroTitle}>
        {isReleases ? 'Release Notes' : 'Blog'}
      </h1>
      <p className={styles.heroSubtitle}>
        {isReleases
          ? `Full changelog and release history for Simple JWT Login.${totalCount > 0 ? ` ${totalCount} releases and counting.` : ''}`
          : 'Tutorials, deep dives, and updates from the Simple JWT Login team.'}
      </p>
    </div>
  );
}

function BlogListPageContent(props: Props): JSX.Element {
  const {metadata, items, sidebar} = props;
  return (
    <BlogLayout sidebar={sidebar}>
      <BlogHero metadata={metadata} />
      <div className={styles.postsGrid}>
        <BlogPostItems items={items} />
      </div>
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
