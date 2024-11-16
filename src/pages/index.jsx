import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';
// import Card from "../components/card";

const awesomeFeatures = [
  {
    title: <>Auto Login</>,
    description: (
      <>You are able to auto-login into a WordPress website with a JWT.</>
    ),
    image: "assets/svg/login-user-2.svg",
    alt: "Login user",
    link: "/docs/autologin/",
  },
  {
    title: <>Register Users</>,
    description: (
      <>
        API endpoint that allows you to register new users in WordPress.
      </>
    ),
    image: "assets/svg/create-user.svg",
    alt: "Register user",
    link: "/docs/register-user/",
  },
  {
    title: <>Delete Users</>,
    description: (
      <>Delete Users with JWT.</>
    ),
    image: "assets/svg/delete-user.svg",
    alt: "Delete user",
    link: "/docs/delete-user/",
  },
  {
    title: <>Authenticate users</>,
    description: <>API endpoint to Generate a JWT, refresh JWT and invalidate JWT.</>,
    image: "assets/svg/authenticate-user.svg",
    alt: "Authenticate user",
    link: "/docs/authentication/",
  },
  {
    title: <>Change & Reset Password</>,
    description: <>This plugin allows you handle password change</>,
    image: "assets/img/password.png",
    alt: "Change and Reset password",
    link: "/docs/change-password/",
  },
  {
    title: <>Limit access by IP</>,
    description: <>Limit access to Simple JWT Login only for specific IP addresses.</>,
    image: "assets/img/ip.png",
    alt: "Limit access by IP",
  },
  {
    title: <>Create users with different roles</>,
    description: <>You are able to create multiple users with different roles on the same endpoint.</>,
    image: "assets/img/roles.png",
    alt: "Roles",
    link: "/docs/register-user/#new-types-of-users",
  },
  {
    title: <>Integrate with other plugins</>,
    description: <>This plugin works well in combination with other plugins that extends the WordPRess REST API.</>,
    image: "assets/img/plug-in.png",
    alt: "Integrate with other plugins",
    link: "/docs/mailpoet/",
  },
  {
    title: <>Protect endpoints</>,
    description: <>This plugin allows you to protect some specific endpoints, or all endpoints with a JWT</>,
    image: "assets/img/protect-endpoints.png",
    alt: "Protect endpoints",
    link: "/docs/protect-endpoints/",
  },
  {
    title: <>Allow JWT usage on other endpoints</>,
    description: <>Add a JWT to requests for other api endpoints and you will act as an authenticated user.</>,
    image: "assets/img/protect.png",
    alt: "JWT on other endpoints",
    link: "/docs/#allow-jwt-usage-on-all-endpoints",
  },
  {
    title: <>Google OAuth Integration</>,
    description: <>
      Login to your website with Google.
    </>,
    image: "assets/img/google-plus.png",
    alt: "Google Oauth",
    link: "/docs/applications/google/login/",
    beta: true,
  },
  {
    title: <>Use Google JWT on all endpoints</>,
    description: <>
       Use the Google JWT in order to access WordPress endpoints as an authenticated user.
    </>,
    image: "assets/img/google-plus-jwt.png",
    alt: "Google Oauth",
    link: "/docs/applications/google/setup/",
    beta: true
  },
];

const reviews = [
  {
    title: <>Awesome plugin</>,
    description: <>The plugin works perfect and the support is even better!</>,
    author: <>@PDXMUSIC</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/pdxmusic/",
  },
  {
    title: <>Thanks for a great plugin</>,
    description: <>Works like a dream. Does what it needs to do. Thanks!</>,
    author: <>@lejager</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/lejager/",
  },
  {
    title: <>Amazing work</>,
    description: <>This plugin serves now as a one-stop shop for JWT authentication, esp for headless WP/web app setups. The even better part is the author who’s extremely helpful, swift in responding & fixing issues, acknowledging improvement suggestions, pleasing to talk to and patient. I hope you can keep up the dedicated work, Nicu!</>,
    author: <>@nilsnolde</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/nilsnolde/",
  },
  {
    title: <>Really good plugin, very straight forward</>,
    description: <>Really good plugin, very straight forward to use</>,
    author: <>@mdruart</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/mdruart/",
  },
];

/**
 *
 * @param {{
 *   title: string | React.ReactNode;
 *   description: string | React.ReactNode;
 *   image?: string;
 *   alt? : string;
 *   link?: string;
 *   beta?: boolean;
 * }} param0
 */
function Section({ title, description ,image,alt, link,beta}) {
  const sectionComponent = <h3>{title}</h3>;
  const fullLink = useBaseUrl(link);
  return (
    <div className={clsx('col col--3', styles.feature, styles.featuresCol)}>
      <div className={styles.featureBlock}>
        {beta ? <span className={styles.beta}>beta</span> : <></>}
        {image ? <img src={image} alt={alt} title={alt} width="60" height="60"/> : <></>}
      {link ? <Link to={fullLink} title={alt}>{sectionComponent}</Link> : sectionComponent}
      <p>{description}</p>
        {link ? <Link to={link} title={alt}>read more</Link> : <></>}
      </div>
    </div>
  );
}

function Star(){
   return (
       <img src={"/assets/img/star.svg"} className={styles.star}  alt="star" title="star" width="20" height="20"/>
   )
}
/**
 *
 * @param {{
 *   title: string | React.ReactNode;
 *   description: string | React.ReactNode;
 *   numberOfStars: number;
 *   author?: string;
 *   link?: string;
 * }} param0
 */
function Review({ title, description ,numberOfStars ,author, link}) {
  return (
        <div className={styles.reviewsRow}>
          <div>
            <span> {author ? <> {link? <Link to={link} title={author}>{author}</Link> : author }</> : <></>}</span>
            <span className={styles.starsContainer}>
              <Star/>
              <Star/>
              <Star/>
              <Star/>
              <Star/>
            </span>
          </div>
          <div className={styles.reviewTitle}>
            {title}
          </div>
          <p>"{description}"</p>
        </div>
  );
}

// @ts-ignore
function Sponsor({name, link, description, image}) {
  return (
      <div className={styles.sponsorItem}>
        <Link to={link} title={name}>
          <img src={image} alt={name} title={name}/>
        </Link>
        <p>{description}</p>
        <p>
          <Link to={link} title={name}>{link}</Link>
        </p>
      </div>
  )
}

function RecentPosts(){
  // TODO: add recent posts back
  const recentPosts = null // require("../../.docusaurus/docusaurus-plugin-content-blog/default/blog-archive-80c.json");

  if(recentPosts === null || typeof recentPosts.blogPosts != 'object'){
    return (<></>)
  }
  return (
      <section className={[styles.sectionPadding].join(" ")}>
        <div className="container">
          <div className="row">
            <h2 className={styles.sectionTitle}>Recent Blog Posts</h2>
          </div>
          <div className="row">
          {recentPosts.blogPosts.slice(0, 6).map((item, index) => (
              <div className="col col--4 text-center" id={"blog-post" + index} key={"key" + index}>
                <div className={styles.blogPostHomepage}>
                  <img src="assets/svg/article.svg" alt="Blog Article" title={item.metadata.title} width="100" height="100" />
                  <span className={styles.blogPostHomepageDate}>{item.metadata.formattedDate}</span>
                  <br />
                  <h3>
                      <a
                        href={`${item.metadata.permalink}`}
                        aria-label={item.metadata.title}
                        title={item.metadata.title}
                    >
                      {item.metadata.title}
                    </a>
                  </h3>
                  <br />
                  <p>{item.metadata.description}</p>

                </div>
              </div>
          ))}
          </div>
        </div>
      </section>
  )
}


function Docs() {
  let statistics = {
    activeInstalls: '+5K',
    downloads: '+55K',
    rating: '5/5',
  }

  return (
    <Layout title="Simple JWT Login" description="Your WordPress plugin that allows you to work with JWT">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img src={"assets/favicons/apple-touch-icon.png"}  alt={"Simple JWT Login logo"} title={"Simple JWT Login logo"} width="180" height="180"/>
          <h1 className="hero__title">Simple JWT Login</h1>
          <p>Simple JWT Login is a FREE WordPress plugin that allows you to use a JWT on WordPress REST endpoints.</p>
          <span>
              <Link
                  to={"https://github.com/nicumicle/simple-jwt-login/blob/master/download/simple-jwt-login.zip?raw=true"}
                  className={styles.actionButton}
                  download={true}
                  title="Download Plugin"
              >
                Download
              </Link>
          </span>
        </div>
      </header>
      <main>
        <section className={[styles.sectionPadding, styles.sectionGreen, styles.statistics].join(" ")}>
            <div className="container">
              <div className="row">
                <h2 className={styles.sectionTitle}>Plugin stats</h2>
              </div>
              <div className="row">
                <div className="col col--4 text-center">
                    <h3 className={styles.statisticsTitle}>Active installs</h3>
                    <h4 className={styles.statisticsNumber}>{statistics.activeInstalls}</h4>
                </div>
                <div className="col col--4 text-center">
                  <h3 className={styles.statisticsTitle}>Downloads</h3>
                  <h4  className={styles.statisticsNumber}>{statistics.downloads}</h4>
                </div>
                <div className="col col--4 text-center">
                  <h3 className={styles.statisticsTitle}>Rating</h3>
                  <h4 className={styles.statisticsNumber}>{statistics.rating}</h4>
                </div>
              </div>
            </div>
        </section>
        {awesomeFeatures && awesomeFeatures.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                  <h2 className={styles.sectionTitle}>Some awesome features</h2>
              </div>
              <div className="row">
                {awesomeFeatures.map((props, idx) => (
                  <Section key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}

        <RecentPosts></RecentPosts>

        <section className={[styles.sectionPadding].join(" ")}>
          <div className="container">
            <div className="row">
              <h2 className={styles.sectionTitle}>Simple JWT Login SDK</h2>
            </div>
            <div className="row">
              <div className="col">
                  <div className={styles.clientCard}>
                    <div className={styles.clientCardTitle}>
                      <h3>PHP</h3>
                    </div>
                    <div className={styles.clientCardContent}>
                      <p>
                        This composer packages will help you integrate your PHP application with Simple JWT Login
                      </p>
                      <img src={"/assets/img/frameworks/php.png"} alt={"PHP"} title={"PHP"} width="40" height="40"/>
                      <img src={"/assets/img/frameworks/laravel.png"}  alt={"Laravel"} title={"Laravel"} width="40" height="40"/>
                      <img src={"/assets/img/frameworks/yii.png"}  alt={"Yii"} title={"Yii"} width="40" height="40"/>
                      <img src={"/assets/img/frameworks/codeigniter.png"}  alt={"Codeigniter"} title={"Codeigniter"}  width="40" height="40"/>
                      <br />
                      <code>composer require "nicumicle/simple-jwt-login-client-php"</code>
                    </div>
                    <div className={styles.clientCardFooter}>
                      <a
                          href="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php"
                          className={styles.btn}
                          title="Download PHP SDK"
                      >
                        Download
                      </a>
                    </div>
                  </div>
              </div>
              <div className="col">
                <div className={styles.clientCard}>
                  <div className={styles.clientCardTitle}>
                    <h3>Javascript</h3>
                  </div>
                  <div className={styles.clientCardContent}>
                    <p>
                      Integrate your application with Simple JWT Login using the SDK with just a few lines of code.
                    </p>
                      <img src={"/assets/img/frameworks/javascript.png"}  alt={"JavaScript"} title={"JavaScript"} width="40" height="40"/>
                      <img src={"/assets/img/frameworks/vue.png"}  alt={"Vue"}  title="Vue" width="40" height="40"/>
                      <img src={"/assets/img/frameworks/react.png"}  alt={"React"} title={"React"} width="40" height="40"/>
                      <img src={"/assets/img/frameworks/angular.png"}  alt={"Angular"} title={"Angular"} width="40" height="40"/>
                      <br />
                    <code>npm install "simple-jwt-login"</code>
                  </div>
                  <div className={styles.clientCardFooter}>
                    <a
                        href="https://www.npmjs.com/package/simple-jwt-login"
                        className={styles.btn}
                        title="Download JS SDK"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {true && (
        <section className={["contribute", styles.sectionPadding].join(" ")}>
          <div className="container text-center">
            <div className="row">
              <h2 className={styles.sectionTitle}>Contribute</h2>
            </div>
            <div className="row">
              <div className="col col--12 text-left">
                <p>
                Your support helps us grow and improve! Whether you're a developer, translator, or just someone who loves this project, there are many ways to get involved.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col col--3 text-center">
                <h3>⭐ Give us a Star on GitHub</h3>
                <p>
                  Show your appreciation and help others discover this project by starring our repository on <Link to={"https://github.com/nicumicle/simple-jwt-login"} title="GitHub stars">GitHub</Link>.
                </p>
              </div>
              <div className="col col--3 text-center">
                <h3>🛠️ Contribute to the Code</h3>
                <p>
                  Have ideas to enhance this plugin or found a bug? Check out our GitHub repository to:
                  <ul className='text-left'>
                    <li className='text-left'>Submit <Link to={"https://github.com/nicumicle/simple-jwt-login/issues"} title="Github Issues">issues</Link>.</li>
                    <li className='text-left'>Propose new <Link to={"https://github.com/nicumicle/simple-jwt-login/issues"} title="Github Issues">features</Link>.</li>
                    <li className='text-left'>Create <Link to={"https://github.com/nicumicle/simple-jwt-login/pulls"} title="Github Pull requests">pull requests</Link> to improve the code.</li>
                  </ul>
                </p>
              </div>
              <div className="col col--3 text-center">
                <h3>📈 Rate Us on WordPress</h3>
                <p>
                  Love this plugin? Share your experience by rating and reviewing it on <Link to={"https://wordpress.org/plugins/simple-jwt-login"} title="WordPress plugin">WordPress.org</Link>. Your feedback inspires us and helps others find the plugin.
                </p>
              </div>
              <div className="col col--3 text-center">
                <h3>🌍 Help Us Translate</h3>

                <p>
                  Make this plugin accessible to a global audience! Join our <Link
                    to={"https://translate.wordpress.org/projects/wp-plugins/simple-jwt-login/"} title="WordPress translate">translation</Link> efforts and help us reach more users in their native language. 
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col col--12'>
                <h3>💖 Why Your Contribution Matters </h3>
                <p>
                  Every contribution, big or small, makes a difference. Together, we can build something even better for the community.
                </p>
              </div>
            </div>
          </div>
        </section>
        )}

        {reviews && reviews.length > 0 && (
            <section className={[styles.features, styles.sectionPadding].join(" ")}>
              <div className="container">
                <div className="row">
                  <h2 className={styles.sectionTitle}>
                    Reviews
                  </h2>
                </div>
                <div className="row">
                  {/*<div className={["col", styles.reviewsLeft].join(" ")}>*/}
                  {/*</div>*/}

                    {reviews.map((props, idx) => (

                        <div className={"col"}>
                          <Review key={idx} {...props}></Review>
                        </div>
                    ))}
                  </div>
                <div className="row">
                  <div className={["col", styles.reviewsMore].join(" ")}>
                    <Link to={"https://wordpress.org/support/plugin/simple-jwt-login/reviews/"} title="View more reviews">View more Reviews</Link>
                  </div>
                </div>
              </div>
            </section>
        )}
      </main>
    </Layout>
  );
}

export default Docs;
