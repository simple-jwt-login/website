import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldHalved, faDownload } from '@fortawesome/free-solid-svg-icons';
import DemoFrame from '../../components/DemoFrame';
import styles from '../styles.module.css';
import ex from './demo.module.css';

export default function TodoDemoPage() {
  return (
    <Layout
      title={translate({id: 'demos.todo.meta.title', message: 'Todo app - Interactive demo'})}
      description={translate({id: 'demos.todo.meta.description', message: 'Try a JWT-authenticated todo app in your browser. Each todo is a private WordPress post, created and listed through the WordPress REST API.'})}
    >
      <main className={styles.sectionPadding}>
        <div className="container">
          <Link to="/demos" className={ex.back}>
            <FontAwesomeIcon icon={faArrowLeft} />{' '}
            <Translate id="demos.todo.back">All demos</Translate>
          </Link>
          <h1 className={styles.sectionTitle}><Translate id="demos.todo.title">Todo app</Translate></h1>
          <p className={styles.sectionLead}>
            <Translate id="demos.todo.lead">
              {'Sign in with your WordPress credentials and manage todos - each one is stored as a private WordPress post, readable only by the authenticated user.'}
            </Translate>
          </p>

          <div className={ex.notice}>
            <Translate
              id="demos.todo.notice"
              values={{
                before: <strong><Translate id="demos.todo.notice.before">Before it works,</Translate></strong>,
                allowAuth: <em><Translate id="demos.todo.notice.allowAuth">Allow Authentication</Translate></em>,
                allEndpoints: <em><Translate id="demos.todo.notice.allEndpoints">All WordPress endpoints check for JWT</Translate></em>,
                postsCode: <code>/wp/v2/posts</code>,
                guideLink: <Link to="/docs/code-examples/todo-app"><Translate id="demos.todo.notice.guideLink">Todo App guide</Translate></Link>,
              }}>
              {'{before} on your WordPress site: enable {allowAuth}, turn on {allEndpoints} (so {postsCode} accepts the token), and enable CORS for this origin. See the {guideLink}.'}
            </Translate>
          </div>

          <div className={ex.infoBox}>
            <FontAwesomeIcon icon={faShieldHalved} className={ex.infoBoxIcon} />
            <Translate
              id="demos.todo.privacy"
              values={{strong: <strong><Translate id="demos.todo.privacy.strong">Your data stays private.</Translate></strong>}}>
              {'{strong} This website does not store any data you enter in the live example - your WordPress URL, credentials, and any details you submit are kept in your browser and sent only to your own WordPress site.'}
            </Translate>
          </div>

          <DemoFrame src="/demo-apps/todo/index.html" title={translate({id: 'demos.todo.frameTitle', message: 'Todo app demo'})} height="640px" />

          <div style={{ marginTop: '1.5rem' }}>
            <a href="/demo-apps/todo/index.html" download className={styles.actionButton}>
              <FontAwesomeIcon icon={faDownload} />{' '}
              <Translate id="demos.todo.download">Download example</Translate>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
