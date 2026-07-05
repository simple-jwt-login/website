import React from 'react';
import styles from './styles.module.css';
import {useCdnUrl} from '@site/src/utils/cdn';


const Stars =({ numberOfStars}) => {
  const starSrc = useCdnUrl('assets/svg/star.svg');
  return (
    <span className={styles.starsContainer}>
      {[...Array(numberOfStars)].map((x, i) =>
        <img key={i} src={starSrc} className={styles.star}  alt="star" title="star" width="20" height="20"/>
      )}
    </span>
  )
}

export default Stars;