import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '../pages/demos/demo.module.css';

/**
 * Embeds a self-contained static demo (plain HTML/JS/CSS from /static/demos)
 * inside an iframe so its global DOM and styles stay isolated from the site.
 */
export default function DemoFrame({ src, title, height }) {
  const url = useBaseUrl(src);
  return (
    <div className={styles.frameWrap}>
      <div className={styles.frameBar}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span className={styles.frameBarUrl}>{title}</span>
        <Link className={styles.openNew} to={url} target="_blank" rel="noopener noreferrer">
          Open in new tab ↗
        </Link>
      </div>
      <iframe
        className={styles.frame}
        src={url}
        title={title}
        style={height ? { height } : undefined}
      />
    </div>
  );
}
