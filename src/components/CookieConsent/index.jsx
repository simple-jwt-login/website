import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
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
    <div className={styles.banner} role="dialog" aria-label={translate({id: 'cookieConsent.ariaLabel', message: 'Cookie consent'})}>
      <p className={styles.text}>
        <Translate id="cookieConsent.text">
          {'We use Google Analytics to see which pages are useful and which aren\'t - no cookies are set until you hit "Accept".'}
        </Translate>
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.decline}
          onClick={handleDecline}
        >
          <Translate id="cookieConsent.decline">Decline</Translate>
        </button>
        <button type="button" className={styles.accept} onClick={handleAccept}>
          <Translate id="cookieConsent.accept">Accept</Translate>
        </button>
      </div>
    </div>
  );
}
