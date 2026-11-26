import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldHalved, faDownload } from '@fortawesome/free-solid-svg-icons';
import DemoFrame from '../../components/DemoFrame';
import styles from '../styles.module.css';
import ex from './demo.module.css';

export default function WooCommerceDemoPage() {
  return (
    <Layout
      title={translate({id: 'demos.woocommerce.meta.title', message: 'Headless WooCommerce Demo'})}
      description={translate({id: 'demos.woocommerce.meta.description', message: 'Try a headless WooCommerce store in your browser - manage products, cart, and checkout through the WooCommerce APIs with only a JWT.'})}
    >
      <main className={styles.sectionPadding}>
        <div className="container">
          <Link to="/demos" className={ex.back}>
            <FontAwesomeIcon icon={faArrowLeft} />{' '}
            <Translate id="demos.woocommerce.back">All demos</Translate>
          </Link>
          <h1 className={styles.sectionTitle}><Translate id="demos.woocommerce.title">Headless WooCommerce store</Translate></h1>
          <p className={styles.sectionLead}>
            <Translate id="demos.woocommerce.lead">
              {'Sign in with your WordPress credentials, then manage products, add items to the cart, and place an order - all authenticated with a JWT in the Authorization header.'}
            </Translate>
          </p>

          <div className={ex.notice}>
            <Translate
              id="demos.woocommerce.notice"
              values={{
                before: <strong><Translate id="demos.woocommerce.notice.before">Before it works,</Translate></strong>,
                integrationLink: <Link to="/docs/integrations/third-party/woocommerce/"><Translate id="demos.woocommerce.notice.integrationLink">WooCommerce integration</Translate></Link>,
                storeApi: <em><Translate id="demos.woocommerce.notice.storeApi">{'Store API cart & checkout'}</Translate></em>,
              }}>
              {'{before} on your WordPress site: activate WooCommerce (with a payment method such as Cash on Delivery), enable the {integrationLink} and its {storeApi} toggle, and enable CORS for this origin. Product management needs an Administrator / Shop Manager account. Use HTTPS.'}
            </Translate>
          </div>

          <div className={ex.infoBox}>
            <FontAwesomeIcon icon={faShieldHalved} className={ex.infoBoxIcon} />
            <Translate
              id="demos.woocommerce.privacy"
              values={{strong: <strong><Translate id="demos.woocommerce.privacy.strong">Your data stays private.</Translate></strong>}}>
              {'{strong} This website does not store any data you enter in the live example - your WordPress URL, credentials, and any details you submit are kept in your browser and sent only to your own WordPress site.'}
            </Translate>
          </div>

          <DemoFrame src="/demo-apps/woocommerce/index.html" title={translate({id: 'demos.woocommerce.frameTitle', message: 'WooCommerce headless demo'})} />

          <div style={{ marginTop: '1.5rem' }}>
            <a href="/demo-apps/woocommerce/index.html" download className={styles.actionButton}>
              <FontAwesomeIcon icon={faDownload} />{' '}
              <Translate id="demos.woocommerce.download">Download example</Translate>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
