import React from 'react';
import styles from './styles.module.css';
import {translate} from '@docusaurus/Translate';
import {useCdnUrl} from '@site/src/utils/cdn';


const Stars =({ numberOfStars}) => {
  const starSrc = useCdnUrl('assets/svg/star.svg');
  return (
    <span className={styles.starsContainer}>
      {[...Array(numberOfStars)].map((x, i) =>
        <img key={i} src={starSrc} className={styles.star}  alt={translate({id: 'stars.alt', message: 'star'})} title={translate({id: 'stars.title', message: 'star'})} width="20" height="20"/>
      )}
    </span>
  )
}

export default Stars;