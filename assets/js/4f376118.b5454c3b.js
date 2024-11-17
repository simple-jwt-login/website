"use strict";(self.webpackChunksimple_jwt_login_website=self.webpackChunksimple_jwt_login_website||[]).push([[2079],{480:e=>{e.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"/simple-jwt-login-export-import-add-on/","metadata":{"permalink":"/website/blog/simple-jwt-login-export-import-add-on/","editUrl":"https://github.com/simple-jwt-login/website/tree/main/blog/2023-03-04-import-export.md","source":"@site/blog/2023-03-04-import-export.md","title":"New Add-on for Simple-JWT-Login - Export-Import","description":"New add-on has been released for Simple-JWT-Login","date":"2023-03-04T00:00:00.000Z","tags":[{"inline":false,"label":"Release","permalink":"/website/blog/tags/tags/release","description":"Plugin Releases"},{"inline":false,"label":"Add-on","permalink":"/website/blog/tags/tags/add-on","description":"Plugin Addons"}],"readingTime":0.36,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Senior Engineer","url":"https://github.com/nicumicle","page":{"permalink":"/website/blog/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"New Add-on for Simple-JWT-Login - Export-Import","description":"New add-on has been released for Simple-JWT-Login","slug":"/simple-jwt-login-export-import-add-on/","hide_table_of_contents":false,"authors":"nicumicle","tags":["release","add-on"]},"unlisted":false,"nextItem":{"title":"How to use the JavaScript SDK in a React App","permalink":"/website/blog/javascript-sdk-usage-react/"}},"content":"We just released the `beta` version for export-import add-on.\\nYou can [Download](https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip)\\nit for **free** from GitHub and test it.\\n\\n\\n\x3c!--truncate--\x3e\\n\\n\\n## Installation\\n\\n1. Download the add-on from https://github.com/simple-jwt-login/export-import/\\n2. Upload the zip file into your WordPress\\n3. Activate the plugin\\n4. Export or import data\\n\\n## Feedback\\n\\nFeel free to test it, and if you find any issues or you want to suggest an improvement,  please open an issue at https://github.com/simple-jwt-login/export-import/issues"},{"id":"/javascript-sdk-usage-react/","metadata":{"permalink":"/website/blog/javascript-sdk-usage-react/","editUrl":"https://github.com/simple-jwt-login/website/tree/main/blog/2022-10-27-how_to_use_the_js_sdk.md","source":"@site/blog/2022-10-27-how_to_use_the_js_sdk.md","title":"How to use the JavaScript SDK in a React App","description":"In this tutorial you will see and real world example on how to use the simple-jwt-login JS SDK in a React App.","date":"2022-10-27T00:00:00.000Z","tags":[{"inline":false,"label":"Tutorial","permalink":"/website/blog/tags/tags/tutorial","description":"Tutorial"}],"readingTime":4.4,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Senior Engineer","url":"https://github.com/nicumicle","page":{"permalink":"/website/blog/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"How to use the JavaScript SDK in a React App","description":"In this tutorial you will see and real world example on how to use the simple-jwt-login JS SDK in a React App.","slug":"/javascript-sdk-usage-react/","hide_table_of_contents":false,"authors":"nicumicle","tags":["tutorials"]},"unlisted":false,"prevItem":{"title":"New Add-on for Simple-JWT-Login - Export-Import","permalink":"/website/blog/simple-jwt-login-export-import-add-on/"},"nextItem":{"title":"CORS Setup on Apache Server","permalink":"/website/blog/cors-setup-apache/"}},"content":"We just released the first version for the JavaScript SDK.\\n\\nThis can be installed in your projects either with `npm`, either with `yarn`.\\n\\nIn order to add the Simple-JWT-Login SDK to your project, just type:\\n```bash\\nnpm install \\"simple-jwt-login\\"\\n```\\n\\nor \\n\\n```bash\\nyarn add \\"simple-jwt-login\\"\\n```\\n\x3c!--truncate--\x3e\\n\\n## Set up the environment \\n\\nNow, let\'s start a new React project, and include the `simple-jwt-login` sdk.\\n\\nIn order to create a new React project in the folder `my-app`, in your console write the following:\\n\\n```bash\\nnpx create-react-app my-app\\n```\\n\\nYou will see a loader, and some files that are being extracted to the folder. Also, when this process finishes, you will see some instructions on how to proceed.\\n\\nNow, we will switch in the console to our new project, and start the React app.\\n```bash\\ncd my-app\\n```\\n\\nand then\\n```bash\\nnpm start\\n```\\n\\nOnce the React starts, a new tab will be opened in your Browser:\\n\\n![React App](/assets/images/react-homescreen.png \\"React Home-screen\\")\\n\\n\\n## Install the Simple-JWT-Login SDK\\n\\nIn your terminal go the folder where you have installed the React App and type:\\n\\n```bash\\nnpm install \\"simple-jwt-login\\"\\n```\\n\\nAfter this, open a code editor, and in your `package.json` you will see `\\"simple-jwt-login\\":\\"^0.1.4\\"`\\n\\n```json\\n\\"dependencies\\": {\\n    \\"@testing-library/jest-dom\\": \\"^5.16.5\\",\\n    \\"@testing-library/react\\": \\"^13.4.0\\",\\n    \\"@testing-library/user-event\\": \\"^13.5.0\\",\\n    \\"react\\": \\"^18.2.0\\",\\n    \\"react-dom\\": \\"^18.2.0\\",\\n    \\"react-scripts\\": \\"5.0.1\\",\\n    \\"simple-jwt-login\\": \\"^0.1.4\\",\\n    \\"web-vitals\\": \\"^2.1.4\\"\\n  },\\n```\\n \\nAt this moment, your React App, can use the simple-jwt-login SDK.\\n\\n## Create a Register form \\n\\nNow, let\'s create a form, that will allow us in the future to register users in our WordPress website.\\n\\nFor this tutorial, we will create the form in the `src/App.js` file.\\n\\nThis file looks like this: \\n```js\\nimport logo from \'./logo.svg\';\\nimport \'./App.css\';\\n\\nfunction App() {\\n  return (\\n    <div className=\\"App\\">\\n      <header className=\\"App-header\\">\\n        <img src={logo} className=\\"App-logo\\" alt=\\"logo\\" />\\n        <p>\\n          Edit <code>src/App.js</code> and save to reload.\\n        </p>\\n        <a\\n          className=\\"App-link\\"\\n          href=\\"https://reactjs.org\\"\\n          target=\\"_blank\\"\\n          rel=\\"noopener noreferrer\\"\\n        >\\n          Learn React\\n        </a>\\n      </header>\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n```\\n\\nNow, we will remove everything that is inside the `<header>` tag.\\n\\n```js\\n// import logo from \'./logo.svg\';\\nimport \'./App.css\';\\n\\nfunction App() {\\n  return (\\n    <div className=\\"App\\">\\n      <header className=\\"App-header\\">\\n         \\n      </header>\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n```\\n\\nNow, let\'s add 2 inputs and one button that will allow us to specify the email and the password for our users and a function `handleClick` that will handle the click event  from the button.\\n\\n```js\\n// import logo from \'./logo.svg\';\\nimport \'./App.css\';\\nimport {useRef} from \'react\';\\n\\nfunction App() {\\n\\n  const emailRef = useRef(null);\\n  const passwordRef = useRef(null);\\n\\n  function handleClick() {\\n      //TODO: here we will call Simple-JWT-Login\\n  }\\n  return (\\n          <div className=\\"App\\">\\n            <header className=\\"App-header\\">\\n              Email:\\n              <input\\n                      ref={emailRef}\\n                      type=\\"text\\"\\n                      id=\\"email\\"\\n                      name=\\"message\\"\\n\\n              />\\n              Password:\\n              <input\\n                      ref={passwordRef}\\n                      type=\\"text\\"\\n                      id=\\"password\\"\\n                      name=\\"message\\"\\n              />\\n              <button onClick={handleClick}>Register User</button>\\n            </header>\\n          </div>\\n  );\\n}\\n\\nexport default App;\\n```\\n\\nAt this moment, we have a register form:\\n\\n![React register form](/assets/images/react_register_form.png \\"React Register Form\\")\\n\\n\\n## Add the Simple-JWT-Login SDK library\\n\\nOn this step, we need to add the simpl-jwt-login SDK in the code.\\n\\nFirst, we need to import it. Add this line at the top of your file:\\n\\n```js\\nimport {SimpleJwtLogin} from \'simple-jwt-login\'\\n```\\n\\nThe code should look like this: \\n```js\\n// import logo from \'./logo.svg\';\\nimport \'./App.css\';\\nimport {useRef} from \'react\';\\nimport {SimpleJwtLogin} from \'simple-jwt-login\'\\n\\nfunction App() {\\n\\n  const emailRef = useRef(null);\\n  const passwordRef = useRef(null);\\n\\n  function handleClick() {\\n      //TODO: here we will call Simple-JWT-Login\\n  }\\n  return (\\n          <div className=\\"App\\">\\n            <header className=\\"App-header\\">\\n              Email:\\n              <input\\n                      ref={emailRef}\\n                      type=\\"text\\"\\n                      id=\\"email\\"\\n                      name=\\"message\\"\\n\\n              />\\n              Password:\\n              <input\\n                      ref={passwordRef}\\n                      type=\\"text\\"\\n                      id=\\"password\\"\\n                      name=\\"message\\"\\n              />\\n              <button onClick={handleClick}>Register User</button>\\n            </header>\\n          </div>\\n  );\\n}\\n\\nexport default App;\\n```\\n\\n\\nThe next step, is to initialize SimpleJWTLogin. \\nFor this example, we have a WordPress instance at `http://localhost:88` with the Simple-JWT-Login plugin installed. The plugin has the default namespace, `simple-jwt-login/v1/`.\\n\\n```js\\nconst simpleJwtLogin = new SimpleJwtLogin(\\"http://localhost:88\\",\\"/simple-jwt-login/v1\\");\\n```\\n\\nNext step, would be to get the values from the inputs, and call Simple-JWT-Login when the button \\"Register User\\" is clicked.\\nIn order to do this, we need to add some code in `handleClick` method:\\n\\n\\n```js\\n  function handleClick() {\\n       //init SimpleJWTLogin\\n       const simpleJwtLogin = new SimpleJwtLogin(\\"http://localhost:88\\",\\"/simple-jwt-login/v1\\");\\n       //Prepare the Request Body with the values from the input\\n       const data = {email: emailRef.current.value, password:passwordRef.current.value, nickname:\\"tests\\"}\\n       \\n       //Call WordPress and create User\\n        let result = simpleJwtLogin.registerUser(data);\\n       \\n       //Display the result in the console\\n       console.log(result);\\n  }\\n```\\n\\n## Wrapping up\\n\\nThis is how our full code will look like:\\n\\n```js\\n// import logo from \'./logo.svg\';\\nimport \'./App.css\';\\nimport {useRef} from \'react\';\\nimport {SimpleJwtLogin} from \'simple-jwt-login\'\\n\\nfunction App() {\\n\\n  const emailRef = useRef(null);\\n  const passwordRef = useRef(null);\\n\\n  function handleClick() {\\n    //init SimpleJWTLogin\\n    const simpleJwtLogin = new SimpleJwtLogin(\\"http://localhost:88\\",\\"/simple-jwt-login/v1\\");\\n    //Prepare the Request Body with the values from the input\\n    const data = {email: emailRef.current.value, password:passwordRef.current.value, nickname:\\"tests\\"}\\n\\n    //Call WordPress and create User\\n    let result = simpleJwtLogin.registerUser(data);\\n\\n    //Display the result in the console\\n    console.log(result);\\n  }\\n  \\n  \\n  return (\\n          <div className=\\"App\\">\\n            <header className=\\"App-header\\">\\n              Email:\\n              <input\\n                      ref={emailRef}\\n                      type=\\"text\\"\\n                      id=\\"email\\"\\n                      name=\\"message\\"\\n\\n              />\\n              Password:\\n              <input\\n                      ref={passwordRef}\\n                      type=\\"text\\"\\n                      id=\\"password\\"\\n                      name=\\"message\\"\\n              />\\n              <button onClick={handleClick}>Register User</button>\\n            </header>\\n          </div>\\n  );\\n}\\n\\nexport default App;\\n```\\n\\nAfter filling the form and click on \\"Register User\\" you will get something similar in your console:\\n\\n![Register user result](/assets/images/react_register_user_console.png \\"The final result\\")\\n\\n\\n## Conclusion\\n\\nUsing the simple-jwt-login SDK allows you to connect to WordPress with only a couple of lines of code. You don\'t need to worry about the endpoints or the request methods. You just need to make sure that you send all the required parameters."},{"id":"/cors-setup-apache/","metadata":{"permalink":"/website/blog/cors-setup-apache/","editUrl":"https://github.com/simple-jwt-login/website/tree/main/blog/2022-10-26-CORS-setup.md","source":"@site/blog/2022-10-26-CORS-setup.md","title":"CORS Setup on Apache Server","description":"In this article, we are going to explain how to set up CORS on your server","date":"2022-10-26T00:00:00.000Z","tags":[{"inline":false,"label":"Tutorial","permalink":"/website/blog/tags/tags/tutorial","description":"Tutorial"}],"readingTime":1.745,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Senior Engineer","url":"https://github.com/nicumicle","page":{"permalink":"/website/blog/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"CORS Setup on Apache Server","description":"In this article, we are going to explain how to set up CORS on your server","slug":"/cors-setup-apache/","hide_table_of_contents":false,"authors":"nicumicle","tags":["tutorials"]},"unlisted":false,"prevItem":{"title":"How to use the JavaScript SDK in a React App","permalink":"/website/blog/javascript-sdk-usage-react/"},"nextItem":{"title":"Release JavaScript SDK","permalink":"/website/blog/simple-jwt-login-js-sdk-0.1.1/"}},"content":"All the time I have issues setting up [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) on my server. I was always struggling with this, and this time I was thinking maybe it is a good time to create a blog article about this.\\n\\nSo, In this tutorial, we are going to set up CORS on an apache server.\\n\\n\x3c!--truncate--\x3e\\n## How to know that there is a CORS issue?\\n\\nFirst, try to call your endpoint from the browser using Javascript. If you see in your console something like: \\n\\n```\\nAccess to ... at \'http://....\' from origin \'http://..\' has been blocked \\nby CORS policy: Response to preflight request doesn\'t pass access control\\ncheck: No \'Access-Control-Allow-Origin\' header is present in the requested resource.\\n```\\n\\nSo, if you see something related to \'CORS\' in the console, that means that you have some CORS issues on your server.\\n\\n## How to fix this?\\n\\nThe first step that you need to do, is to connect to your server via SSH.\\n\\nOn your server, you have to make sure that the headers mod is enabled. \\n```bash\\nsudo a2enmod headers\\n```\\nAfter this, you will see something like this: \\n```\\nEnabling module headers.\\nTo activate the new configuration, you need to run:\\n  service apache2 restart\\n```\\n\\nIf the headers have been enabled before, you will get a message like this: \\n```\\nModule headers already enabled\\n```\\n\\nThe next step is to edit the apache2 conf file.\\n```bash\\nvi /etc/apache2/apache2.conf\\n```\\n\\nIf your website is running from `/var/www/html`, in this file, search for: \\n\\n```\\n<Directory /var/www/html\\">\\n```\\nIf you can not find that, just add it at the end of the file:\\n```bash\\n<Directory \\"/var/www/html\\">\\n    AllowOverride None\\n    Require all granted\\n\\n    Header set Access-Control-Allow-Origin \\"*\\"\\n    Header set Access-Control-Allow-Methods \\"GET, POST, PUT, PATCH, DELETE, OPTIONS\\"\\n    Header set Access-Control-Allow-Headers \\"x-requested-with, Content-Type, origin, authorization, accept, client-security-token\\"\\n    Header set Access-Control-Expose-Headers \\"Content-Security-Policy, Location\\"\\n    Header set Access-Control-Max-Age \\"600\\"\\n\\n    RewriteEngine On\\n    RewriteCond %{REQUEST_METHOD} OPTIONS\\n    RewriteRule ^(.*)$ $1 [R=200,L]\\n\\n</Directory>\\n```\\n\\nNow, you just need to restart the apache:\\n```bash\\nsudo service apache2 restart\\n```\\n\\nAfter this, you will be able to make HTTP calls to your server from the browser.\\n\\nEnjoy."},{"id":"/simple-jwt-login-js-sdk-0.1.1/","metadata":{"permalink":"/website/blog/simple-jwt-login-js-sdk-0.1.1/","editUrl":"https://github.com/simple-jwt-login/website/tree/main/blog/2022-10-25-release-js-sdk.md","source":"@site/blog/2022-10-25-release-js-sdk.md","title":"Release JavaScript SDK","description":"The Javascript SDK 0.1.0 has been released","date":"2022-10-25T00:00:00.000Z","tags":[{"inline":false,"label":"Release","permalink":"/website/blog/tags/tags/release","description":"Plugin Releases"}],"readingTime":0.875,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Senior Engineer","url":"https://github.com/nicumicle","page":{"permalink":"/website/blog/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"Release JavaScript SDK","description":"The Javascript SDK 0.1.0 has been released","slug":"/simple-jwt-login-js-sdk-0.1.1/","hide_table_of_contents":false,"authors":"nicumicle","tags":["release"]},"unlisted":false,"prevItem":{"title":"CORS Setup on Apache Server","permalink":"/website/blog/cors-setup-apache/"},"nextItem":{"title":"Simple JWT Login in the news","permalink":"/website/blog/simple-jwt-login-wp-glob/"}},"content":"Finally, the JavaScript SDK for Simple JWT Login has been released.\\nYou can now use it in your projects:\\n\\n```bash\\nnpm install \\"simple-jwt-login\\"\\n```\\n\\nor if you prefer yarn: \\n```bash\\nyarn add \\"simple-jwt-login\\"\\n```\\n\x3c!--truncate--\x3e\\n\\nYou can find the package code on github: [https://github.com/simple-jwt-login/js-sdk](https://github.com/simple-jwt-login/js-sdk).\\n\\nFeel free to star the repository, check the code, create issues or even share it on social media.\\n\\n\\nNow, with just a few lines of code, you are able to call Simple-JWT-Login endpoints.\\n\\nHere is a simple register example using the JS SDK:\\n\\n```js\\nimport { SimpleJwtLogin } from \\"simple-jwt-login\\";\\n\\nconst simpleJwtLogin = new SimpleJwtLogin(\\n  \\"http://your-domain.com\\",\\n  \\"/simple-jwt-login/v1\\",\\n  \\"AUTH_KEY\\"\\n);\\nlet params = {\\n  email: \\"me@mydomain.com\\",\\n  password: \\"my-secret-password\\",\\n  nickname: \\"coolnickname\\",\\n};\\n\\nlet result = simpleJwtLogin.registerUser(params, \\"MY_AUTH_KEY\\");\\n```\\n\\nAnd voil\xe0. A new user is registered.\\n\\nWith this SDK, with just a few lines of code, you can:\\n- Autologin to WordPress\\n- Delete a user\\n- Register a user\\n- Reset user password\\n- Change user password\\n- Authenticate into WordPress\\n- Refresh a token\\n- Validate a token\\n- Revoke a token"},{"id":"/simple-jwt-login-wp-glob/","metadata":{"permalink":"/website/blog/simple-jwt-login-wp-glob/","editUrl":"https://github.com/simple-jwt-login/website/tree/main/blog/2022-08-23-wp-glob-article.md","source":"@site/blog/2022-08-23-wp-glob-article.md","title":"Simple JWT Login in the news","description":"WPGlob posted article about simple-jwt-login","date":"2022-08-23T00:00:00.000Z","tags":[{"inline":false,"label":"News","permalink":"/website/blog/tags/tags/news","description":"Plugin news"}],"readingTime":0.3,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Senior Engineer","url":"https://github.com/nicumicle","page":{"permalink":"/website/blog/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"Simple JWT Login in the news","description":"WPGlob posted article about simple-jwt-login","slug":"/simple-jwt-login-wp-glob/","hide_table_of_contents":false,"authors":"nicumicle","tags":["news"]},"unlisted":false,"prevItem":{"title":"Release JavaScript SDK","permalink":"/website/blog/simple-jwt-login-js-sdk-0.1.1/"},"nextItem":{"title":"MailPoet add-on released","permalink":"/website/blog/simple-jwt-login-mailpoet/"}},"content":"Simple-JWT Login got published on wpglob.com in an article about \\"Best List of Password Management Plugins for WordPress\\".\\n\\n\x3c!-- truncate --\x3e\\nWe are happy that we are listed along some other cool plugins.\\n\\nFee free to read the article at: https://wpglob.com/best-list-of-password-management-plugins-for-wordpress/\\n\\nIf you want to promote your WordPress plugin, just visit the WPGLob page at: <a href=\\"https://wpglob.com/promote-wordpress-plugin/\\" rel=\\"external\\">Promote WordPress plugin</a>."},{"id":"/simple-jwt-login-mailpoet/","metadata":{"permalink":"/website/blog/simple-jwt-login-mailpoet/","editUrl":"https://github.com/simple-jwt-login/website/tree/main/blog/2022-04-25-mailpoet-addon.md","source":"@site/blog/2022-04-25-mailpoet-addon.md","title":"MailPoet add-on released","description":"MailPoet add-on released","date":"2022-04-25T00:00:00.000Z","tags":[{"inline":false,"label":"News","permalink":"/website/blog/tags/tags/news","description":"Plugin news"},{"inline":false,"label":"Add-on","permalink":"/website/blog/tags/tags/add-on","description":"Plugin Addons"}],"readingTime":0.355,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Senior Engineer","url":"https://github.com/nicumicle","page":{"permalink":"/website/blog/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"MailPoet add-on released","description":"MailPoet add-on released","slug":"/simple-jwt-login-mailpoet/","hide_table_of_contents":false,"authors":"nicumicle","tags":["news","add-on"]},"unlisted":false,"prevItem":{"title":"Simple JWT Login in the news","permalink":"/website/blog/simple-jwt-login-wp-glob/"},"nextItem":{"title":"Welcome to the new Simple JWT Login Website","permalink":"/website/blog/simple-jwt-login-plus-docusaurus/"}},"content":"The first add-on for Simple JWT Login plugin has been released. \\n\\nMailPoet add on allows you to generate Autologin links in your newsletters.\\n\\n\x3c!--truncate--\x3e\\n\\n![](https://ps.w.org/simple-jwt-login-mailpoet/assets/banner-1544x500.png)\\n\\n\\nThe MailPoet add-on allows you to automatically login users from the newsletter sent by MailPoet into a WordPress website using a JWT.\\n\\nThis add-on will generate short codes that can be used in your MailPoet templates.\\n\\nCheck more details in the documentation.\\n\\n[Read more about MailPoet](/docs/mailpoet)"},{"id":"simple-jwt-login-plus-docusaurus/","metadata":{"permalink":"/website/blog/simple-jwt-login-plus-docusaurus/","editUrl":"https://github.com/simple-jwt-login/website/tree/main/blog/2022-02-27-hello-docusaurus-v2.md","source":"@site/blog/2022-02-27-hello-docusaurus-v2.md","title":"Welcome to the new Simple JWT Login Website","description":"New website built with Docusaurus","date":"2022-02-27T00:00:00.000Z","tags":[{"inline":false,"label":"News","permalink":"/website/blog/tags/tags/news","description":"Plugin news"}],"readingTime":1.04,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Senior Engineer","url":"https://github.com/nicumicle","page":{"permalink":"/website/blog/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"Welcome to the new Simple JWT Login Website","description":"New website built with Docusaurus","slug":"simple-jwt-login-plus-docusaurus/","hide_table_of_contents":false,"authors":"nicumicle","tags":["news"]},"unlisted":false,"prevItem":{"title":"MailPoet add-on released","permalink":"/website/blog/simple-jwt-login-mailpoet/"}},"content":"I\'m very excited about this new website for Simple JWT Login, using [**Docusaurus 2**](https://docusaurus.io/).\\n\\nDocusaurus offered me a simple way, to write documentation, and also build the website in the same place. The learning curve was fast, and I enjoyed writing code in React.  \\n\\n\x3c!--truncate--\x3e\\n\\n## Previous website\\nPreviously, I\'ve used [docsify](https://docsify.js.org/) ( Also, a very cool site documentation generator) and the website has been made in PHP.\\n\\nIt was very hard to do changes, and add new pages because that involved a lot of coding, writing routes, and loading content.\\n\\n\\n## About the blog\\n\\nWhile writing documentation, it came to my mind that it will also be cool to start a blog. In this blog I\'m planning to write real world use-cases of the plugin and write announcements about the plugin.\\n\\nSo, if you are interested on what features have been implemented, or what tips&tricks you can use while you develop your website, keep an eye on this blog.\\n\\n\\nAlso, I\'m planning to publish the documentation to GitHub, so that, anybody can add/modify the things there. In fact, this documentation is made for you to understand.\\n\\nI hope that, with the help of the community, there will be much easier for new users to use this plugin."}]}}')}}]);