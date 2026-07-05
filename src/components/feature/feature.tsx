import React, {useState} from 'react';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useCdnUrl} from '@site/src/utils/cdn';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const VERSION_TAGS = {
  both: ['v3', 'v4'],
  v4: ['v4'],
};

const Feature =({ title, description ,image, faIcon, alt, link, version}) => {
  const sectionComponent = <h3>{title}</h3>;
  const fullLink = useBaseUrl(link);
  const imageSrc = useCdnUrl(image);
  const versionTags = version ? VERSION_TAGS[version] : [];
  return (
    <div className={clsx('col col--3', styles.feature, styles.featuresCol)}>
      <div className={styles.featureBlock}>
        {versionTags.length > 0 && (
          <div className={styles.versionBadgeGroup}>
            {versionTags.map((tag) => (
              <span key={tag} className={clsx(styles.versionBadge, tag === 'v4' ? styles.versionBadgeV4 : styles.versionBadgeV3)}>
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        )}
        <div className={styles.featureIcon}>
          {faIcon ? <FontAwesomeIcon icon={faIcon} /> : image ? <img src={imageSrc} alt={alt} title={alt} width="60" height="60"/> : <></>}
        </div>

        <div className={styles.title}>
          {link ? <Link to={fullLink} title={alt}>{sectionComponent}</Link> : sectionComponent}
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.readmore}>
          {link ? <Link to={link} title={alt}>read more</Link> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Feature;