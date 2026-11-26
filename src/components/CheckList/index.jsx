import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

// Same check as the comparison tables (src/components/Status). className sets spacing and font size.
export default function CheckList({ items, className }) {
  return (
    <ul className={clsx(styles.list, className)}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <FontAwesomeIcon icon={faCircleCheck} className={styles.icon} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
