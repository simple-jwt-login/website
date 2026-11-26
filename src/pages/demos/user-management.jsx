import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldHalved, faDownload } from '@fortawesome/free-solid-svg-icons';
import DemoFrame from '../../components/DemoFrame';
import styles from '../styles.module.css';
import ex from './demo.module.css';

export default function UserManagementDemoPage() {
  return (
    <Layout
      title={translate({id: 'demos.userManagement.meta.title', message: 'WordPress User Management Demo'})}
      description={translate({id: 'demos.userManagement.meta.description', message: 'List, search, and delete WordPress users with only a JWT, live in your browser - administrator access required.'})}
    >
      <main className={styles.sectionPadding}>
        <div className="container">
          <Link to="/demos" className={ex.back}>
            <FontAwesomeIcon icon={faArrowLeft} />{' '}
            <Translate id="demos.userManagement.back">All demos</Translate>
          </Link>
          <h1 className={styles.sectionTitle}><Translate id="demos.userManagement.title">WordPress user management</Translate></h1>
          <p className={styles.sectionLead}>
            <Translate id="demos.userManagement.lead">
              {'Sign in with your WordPress credentials, then list, search, and delete user accounts - all authenticated with a JWT in the Authorization header. Requires an Administrator account; any other role is denied access.'}
            </Translate>
          </p>

          <div className={ex.notice}>
            <Translate
              id="demos.userManagement.notice"
              values={{
                before: <strong><Translate id="demos.userManagement.notice.before">Before it works,</Translate></strong>,
                admin: <strong><Translate id="demos.userManagement.notice.admin">Administrator</Translate></strong>,
                listUsers: <code>list_users</code>,
                deleteUsers: <code>delete_users</code>,
                reassign: <code>reassign</code>,
              }}>
              {'{before} on your WordPress site: enable CORS for this origin and sign in with an {admin} account - listing and deleting other users needs the {listUsers} / {deleteUsers} capability. Deleting a user reassigns their posts to the signed-in admin (the REST API\'s {reassign} parameter). Use HTTPS.'}
            </Translate>
          </div>

          <div className={ex.infoBox}>
            <FontAwesomeIcon icon={faShieldHalved} className={ex.infoBoxIcon} />
            <Translate
              id="demos.userManagement.privacy"
              values={{strong: <strong><Translate id="demos.userManagement.privacy.strong">Your data stays private.</Translate></strong>}}>
              {'{strong} This website does not store any data you enter in the live example - your WordPress URL, credentials, and any details you submit are kept in your browser and sent only to your own WordPress site.'}
            </Translate>
          </div>

          <DemoFrame src="/demo-apps/user-management/index.html" title={translate({id: 'demos.userManagement.frameTitle', message: 'User management headless demo'})} />

          <div style={{ marginTop: '1.5rem' }}>
            <a href="/demo-apps/user-management/index.html" download className={styles.actionButton}>
              <FontAwesomeIcon icon={faDownload} />{' '}
              <Translate id="demos.userManagement.download">Download example</Translate>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
