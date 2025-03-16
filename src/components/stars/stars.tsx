import React from 'react';
import styles from './styles.module.css';


const Stars =({ numberOfStars}) => {
  return (
    <span className={styles.starsContainer}>
      {[...Array(numberOfStars)].map((x, i) =>
        <img src={"assets/img/star.svg"} className={styles.star}  alt="star" title="star" width="20" height="20"/>
      )}
    </span>
  )
}

export default Stars;