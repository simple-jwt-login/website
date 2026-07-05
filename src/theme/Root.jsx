import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CookieConsent from '@site/src/components/CookieConsent';

export default function Root({children}) {
  const {siteConfig} = useDocusaurusContext();
  const siteUrl = siteConfig.url;

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Simple JWT Login',
    url: siteUrl,
    logo: `${siteUrl}/assets/favicons/android-chrome-192x192.png`,
    sameAs: [
      'https://github.com/nicumicle/simple-jwt-login',
      'https://wordpress.org/plugins/simple-jwt-login',
      'https://twitter.com/simplejwtlogin',
      'https://discord.gg/c4AeefD8Dr',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Simple JWT Login',
    url: siteUrl,
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      </Head>
      {children}
      <CookieConsent />
    </>
  );
}
