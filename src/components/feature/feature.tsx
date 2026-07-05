import React, {useState} from 'react';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useCdnUrl} from '@site/src/utils/cdn';


const Feature =({ title, description ,image,alt, link}) => {
  const sectionComponent = <h3>{title}</h3>;
  const fullLink = useBaseUrl(link);
  const imageSrc = useCdnUrl(image);
  return (
    <div className={clsx('col col--3', styles.feature, styles.featuresCol)}>
      <div className={styles.featureBlock}>
        <div className={styles.featureIcon}>
          {image ? <img src={imageSrc} alt={alt} title={alt} width="60" height="60"/> : <></>}
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