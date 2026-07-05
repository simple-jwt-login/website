import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  getStoredConsent,
  storeConsent,
  loadGoogleAnalytics,
} from '@site/src/utils/analytics';
import styles from './index.module.css';

export default function CookieConsent() {
  const {siteConfig} = useDocusaurusContext();
  const gaMeasurementId = siteConfig.customFields?.gaMeasurementId;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (consent === 'accepted') {
      loadGoogleAnalytics(gaMeasurementId);
      return;
    }
    if (consent === null) {
      setVisible(true);
    }
  }, [gaMeasurementId]);

  function handleAccept() {
    storeConsent('accepted');
    loadGoogleAnalytics(gaMeasurementId);
    setVisible(false);
  }

  function handleDecline() {
    storeConsent('declined');
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p className={styles.text}>
        We use cookies to analyze site traffic with Google Analytics. Analytics
        cookies are only set if you accept.
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.decline}
          onClick={handleDecline}
        >
          Decline
        </button>
        <button type="button" className={styles.accept} onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
}
