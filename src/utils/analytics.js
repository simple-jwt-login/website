export const CONSENT_STORAGE_KEY = 'sjl_cookie_consent';

export function getStoredConsent() {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(CONSENT_STORAGE_KEY);
}

export function storeConsent(value) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
}

let gaLoaded = false;

export function loadGoogleAnalytics(measurementId) {
  if (typeof window === 'undefined' || !measurementId || gaLoaded) {
    return;
  }
  gaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, {anonymize_ip: true});

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);
}
