/**
 * Swizzled BlogPostItem.
 * - List view  → modern card with tags, meta, description, read-more
 * - Post view  → default Docusaurus layout (unchanged)
 */
import React from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import type {Props} from '@theme/BlogPostItem';
import styles from './styles.module.css';

/** Card shown in the blog / releases list. */
function BlogPostCard(): JSX.Element {
  const {metadata} = useBlogPost();
  const {
    title,
    permalink,
    date,
    formattedDate,
    readingTime,
    tags,
    description,
    authors,
  } = metadata;

  const firstAuthor = authors && authors.length > 0 ? authors[0] : null;

  return (
    <article className={styles.card}>
      {/* Tags */}
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Link key={tag.label} to={tag.permalink} className={styles.tag}>
              {tag.label}
            </Link>
          ))}
        </div>
      )}

      {/* Title */}
      <h2 className={styles.title}>
        <Link to={permalink}>{title}</Link>
      </h2>

      {/* Meta: date + reading time */}
      <div className={styles.meta}>
        <time dateTime={date}>{formattedDate}</time>
        {typeof readingTime !== 'undefined' && (
          <span className={styles.readingTime}>
            &nbsp;·&nbsp;{Math.ceil(readingTime)} min read
          </span>
        )}
      </div>

      {/* Description / excerpt */}
      {description && <p className={styles.description}>{description}</p>}

      {/* Footer: author + read-more */}
      <div className={styles.footer}>
        {firstAuthor && (
          <div className={styles.author}>
            {firstAuthor.imageURL && (
              <img
                src={firstAuthor.imageURL}
                alt={firstAuthor.name ?? ''}
                className={styles.authorAvatar}
                width={24}
                height={24}
              />
            )}
            {firstAuthor.name && (
              <span className={styles.authorName}>{firstAuthor.name}</span>
            )}
          </div>
        )}
        <Link to={permalink} className={styles.readMore} aria-label={`Read more about ${title}`}>
          Read more →
        </Link>
      </div>
    </article>
  );
}

export default function BlogPostItem({
  children,
  className,
}: Props): JSX.Element {
  const {isBlogPostPage} = useBlogPost();

  // Full post page: keep the default Docusaurus layout
  if (isBlogPostPage) {
    return (
      <BlogPostItemContainer className={className}>
        <BlogPostItemHeader />
        <BlogPostItemContent>{children}</BlogPostItemContent>
        <BlogPostItemFooter />
      </BlogPostItemContainer>
    );
  }

  // List view: render as a card
  return <BlogPostCard />;
}
