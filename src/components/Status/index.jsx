import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faCircleXmark, faClock, faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

const kinds = {
  yes: { icon: faCircleCheck, className: styles.yes },
  no: { icon: faCircleXmark, className: styles.no },
  partial: { icon: faTriangleExclamation, className: styles.partial },
  soon: { icon: faClock, className: styles.soon },
};

// The text says the status, so the icon is decorative.
export default function Status({ kind, children }) {
  const { icon, className } = kinds[kind];
  return (
    <span className={styles.status}>
      <FontAwesomeIcon icon={icon} className={className} aria-hidden="true" />
      {children}
    </span>
  );
}
