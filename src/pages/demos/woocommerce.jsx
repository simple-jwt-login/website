import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import DemoFrame from '../../components/DemoFrame';
import styles from '../styles.module.css';
import ex from './demo.module.css';

export default function WooCommerceDemoPage() {
  return (
    <Layout
      title="Headless WooCommerce store - Interactive demo"
      description="Manage WooCommerce products, cart, and checkout with only a JWT, live in your browser."
    >
      <main className={styles.sectionPadding}>
        <div className="container">
          <Link to="/demos" className={ex.back}>
            <FontAwesomeIcon icon={faArrowLeft} /> All demos
          </Link>
          <h1 className={styles.sectionTitle}>Headless WooCommerce store</h1>
          <p className={styles.sectionLead}>
            Sign in with your WordPress credentials, then manage products, add items to the
            cart, and place an order - all authenticated with a JWT in the Authorization header.
          </p>

          <div className={ex.notice}>
            <strong>Before it works,</strong> on your WordPress site: activate WooCommerce
            (with a payment method such as Cash on Delivery), enable the{' '}
            <Link to="/docs/integrations/third-party/woocommerce/">WooCommerce integration</Link>{' '}
            and its <em>Store API cart &amp; checkout</em> toggle, and enable CORS for this origin.
            Product management needs an Administrator / Shop Manager account. Use HTTPS.
          </div>

          <div className={ex.infoBox}>
            <FontAwesomeIcon icon={faShieldHalved} className={ex.infoBoxIcon} />
            <span>
              <strong>Your data stays private.</strong> This website does not store any data
              you enter in the live example - your WordPress URL, credentials, and any details
              you submit are kept in your browser and sent only to your own WordPress site.
            </span>
          </div>

          <DemoFrame src="/demo-apps/woocommerce/index.html" title="WooCommerce headless demo" />
        </div>
      </main>
    </Layout>
  );
}
