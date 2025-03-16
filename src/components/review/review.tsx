import React from 'react';
import styles from './styles.module.css';
import Stars from "@site/src/components/stars/stars";
import Link from '@docusaurus/Link';


const Review =({ title, description ,numberOfStars ,author, link})  => {
  return (
        <div className={styles.reviewsRow}>
          <div>
            <span> {author ? <> {link? <Link to={link} title={author}>{author}</Link> : author }</> : <></>}</span>
            <Stars numberOfStars={numberOfStars} />
          </div>
          <div className={styles.reviewTitle}>
            {title}
          </div>
          <p>"{description}"</p>
        </div>
  );
}

export default Review;