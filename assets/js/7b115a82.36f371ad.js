"use strict";(self.webpackChunksimple_jwt_login_website=self.webpackChunksimple_jwt_login_website||[]).push([[7134],{9234:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var s=t(8563),i=t(4848),l=t(8453);const o={title:"How to use the JavaScript SDK in a React App",description:"In this tutorial you will see and real world example on how to use the simple-jwt-login JS SDK in a React App.",slug:"/javascript-sdk-usage-react/",hide_table_of_contents:!1,authors:"nicumicle",tags:["tutorials"]},r=void 0,a={authorsImageUrls:[void 0]},c=[{value:"Set up the environment",id:"set-up-the-environment",level:2},{value:"Install the Simple-JWT-Login SDK",id:"install-the-simple-jwt-login-sdk",level:2},{value:"Create a Register form",id:"create-a-register-form",level:2},{value:"Add the Simple-JWT-Login SDK library",id:"add-the-simple-jwt-login-sdk-library",level:2},{value:"Wrapping up",id:"wrapping-up",level:2},{value:"Conclusion",id:"conclusion",level:2}];function p(e){const n={code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"We just released the first version for the JavaScript SDK."}),"\n",(0,i.jsxs)(n.p,{children:["This can be installed in your projects either with ",(0,i.jsx)(n.code,{children:"npm"}),", either with ",(0,i.jsx)(n.code,{children:"yarn"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"In order to add the Simple-JWT-Login SDK to your project, just type:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'npm install "simple-jwt-login"\n'})}),"\n",(0,i.jsx)(n.p,{children:"or"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'yarn add "simple-jwt-login"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"set-up-the-environment",children:"Set up the environment"}),"\n",(0,i.jsxs)(n.p,{children:["Now, let's start a new React project, and include the ",(0,i.jsx)(n.code,{children:"simple-jwt-login"})," sdk."]}),"\n",(0,i.jsxs)(n.p,{children:["In order to create a new React project in the folder ",(0,i.jsx)(n.code,{children:"my-app"}),", in your console write the following:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx create-react-app my-app\n"})}),"\n",(0,i.jsx)(n.p,{children:"You will see a loader, and some files that are being extracted to the folder. Also, when this process finishes, you will see some instructions on how to proceed."}),"\n",(0,i.jsx)(n.p,{children:"Now, we will switch in the console to our new project, and start the React app."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd my-app\n"})}),"\n",(0,i.jsx)(n.p,{children:"and then"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm start\n"})}),"\n",(0,i.jsx)(n.p,{children:"Once the React starts, a new tab will be opened in your Browser:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"React App",src:t(3521).A+"",title:"React Home-screen",width:"2024",height:"1284"})}),"\n",(0,i.jsx)(n.h2,{id:"install-the-simple-jwt-login-sdk",children:"Install the Simple-JWT-Login SDK"}),"\n",(0,i.jsx)(n.p,{children:"In your terminal go the folder where you have installed the React App and type:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'npm install "simple-jwt-login"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["After this, open a code editor, and in your ",(0,i.jsx)(n.code,{children:"package.json"})," you will see ",(0,i.jsx)(n.code,{children:'"simple-jwt-login":"^0.1.4"'})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"dependencies": {\n    "@testing-library/jest-dom": "^5.16.5",\n    "@testing-library/react": "^13.4.0",\n    "@testing-library/user-event": "^13.5.0",\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-scripts": "5.0.1",\n    "simple-jwt-login": "^0.1.4",\n    "web-vitals": "^2.1.4"\n  },\n'})}),"\n",(0,i.jsx)(n.p,{children:"At this moment, your React App, can use the simple-jwt-login SDK."}),"\n",(0,i.jsx)(n.h2,{id:"create-a-register-form",children:"Create a Register form"}),"\n",(0,i.jsx)(n.p,{children:"Now, let's create a form, that will allow us in the future to register users in our WordPress website."}),"\n",(0,i.jsxs)(n.p,{children:["For this tutorial, we will create the form in the ",(0,i.jsx)(n.code,{children:"src/App.js"})," file."]}),"\n",(0,i.jsx)(n.p,{children:"This file looks like this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import logo from \'./logo.svg\';\nimport \'./App.css\';\n\nfunction App() {\n  return (\n    <div className="App">\n      <header className="App-header">\n        <img src={logo} className="App-logo" alt="logo" />\n        <p>\n          Edit <code>src/App.js</code> and save to reload.\n        </p>\n        <a\n          className="App-link"\n          href="https://reactjs.org"\n          target="_blank"\n          rel="noopener noreferrer"\n        >\n          Learn React\n        </a>\n      </header>\n    </div>\n  );\n}\n\nexport default App;\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Now, we will remove everything that is inside the ",(0,i.jsx)(n.code,{children:"<header>"})," tag."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"// import logo from './logo.svg';\nimport './App.css';\n\nfunction App() {\n  return (\n    <div className=\"App\">\n      <header className=\"App-header\">\n         \n      </header>\n    </div>\n  );\n}\n\nexport default App;\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Now, let's add 2 inputs and one button that will allow us to specify the email and the password for our users and a function ",(0,i.jsx)(n.code,{children:"handleClick"})," that will handle the click event  from the button."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'// import logo from \'./logo.svg\';\nimport \'./App.css\';\nimport {useRef} from \'react\';\n\nfunction App() {\n\n  const emailRef = useRef(null);\n  const passwordRef = useRef(null);\n\n  function handleClick() {\n      //TODO: here we will call Simple-JWT-Login\n  }\n  return (\n          <div className="App">\n            <header className="App-header">\n              Email:\n              <input\n                      ref={emailRef}\n                      type="text"\n                      id="email"\n                      name="message"\n\n              />\n              Password:\n              <input\n                      ref={passwordRef}\n                      type="text"\n                      id="password"\n                      name="message"\n              />\n              <button onClick={handleClick}>Register User</button>\n            </header>\n          </div>\n  );\n}\n\nexport default App;\n'})}),"\n",(0,i.jsx)(n.p,{children:"At this moment, we have a register form:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"React register form",src:t(5248).A+"",title:"React Register Form",width:"862",height:"1094"})}),"\n",(0,i.jsx)(n.h2,{id:"add-the-simple-jwt-login-sdk-library",children:"Add the Simple-JWT-Login SDK library"}),"\n",(0,i.jsx)(n.p,{children:"On this step, we need to add the simpl-jwt-login SDK in the code."}),"\n",(0,i.jsx)(n.p,{children:"First, we need to import it. Add this line at the top of your file:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import {SimpleJwtLogin} from 'simple-jwt-login'\n"})}),"\n",(0,i.jsx)(n.p,{children:"The code should look like this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'// import logo from \'./logo.svg\';\nimport \'./App.css\';\nimport {useRef} from \'react\';\nimport {SimpleJwtLogin} from \'simple-jwt-login\'\n\nfunction App() {\n\n  const emailRef = useRef(null);\n  const passwordRef = useRef(null);\n\n  function handleClick() {\n      //TODO: here we will call Simple-JWT-Login\n  }\n  return (\n          <div className="App">\n            <header className="App-header">\n              Email:\n              <input\n                      ref={emailRef}\n                      type="text"\n                      id="email"\n                      name="message"\n\n              />\n              Password:\n              <input\n                      ref={passwordRef}\n                      type="text"\n                      id="password"\n                      name="message"\n              />\n              <button onClick={handleClick}>Register User</button>\n            </header>\n          </div>\n  );\n}\n\nexport default App;\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The next step, is to initialize SimpleJWTLogin.\nFor this example, we have a WordPress instance at ",(0,i.jsx)(n.code,{children:"http://localhost:88"})," with the Simple-JWT-Login plugin installed. The plugin has the default namespace, ",(0,i.jsx)(n.code,{children:"simple-jwt-login/v1/"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'const simpleJwtLogin = new SimpleJwtLogin("http://localhost:88","/simple-jwt-login/v1");\n'})}),"\n",(0,i.jsxs)(n.p,{children:['Next step, would be to get the values from the inputs, and call Simple-JWT-Login when the button "Register User" is clicked.\nIn order to do this, we need to add some code in ',(0,i.jsx)(n.code,{children:"handleClick"})," method:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'  function handleClick() {\n       //init SimpleJWTLogin\n       const simpleJwtLogin = new SimpleJwtLogin("http://localhost:88","/simple-jwt-login/v1");\n       //Prepare the Request Body with the values from the input\n       const data = {email: emailRef.current.value, password:passwordRef.current.value, nickname:"tests"}\n       \n       //Call WordPress and create User\n        let result = simpleJwtLogin.registerUser(data);\n       \n       //Display the result in the console\n       console.log(result);\n  }\n'})}),"\n",(0,i.jsx)(n.h2,{id:"wrapping-up",children:"Wrapping up"}),"\n",(0,i.jsx)(n.p,{children:"This is how our full code will look like:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'// import logo from \'./logo.svg\';\nimport \'./App.css\';\nimport {useRef} from \'react\';\nimport {SimpleJwtLogin} from \'simple-jwt-login\'\n\nfunction App() {\n\n  const emailRef = useRef(null);\n  const passwordRef = useRef(null);\n\n  function handleClick() {\n    //init SimpleJWTLogin\n    const simpleJwtLogin = new SimpleJwtLogin("http://localhost:88","/simple-jwt-login/v1");\n    //Prepare the Request Body with the values from the input\n    const data = {email: emailRef.current.value, password:passwordRef.current.value, nickname:"tests"}\n\n    //Call WordPress and create User\n    let result = simpleJwtLogin.registerUser(data);\n\n    //Display the result in the console\n    console.log(result);\n  }\n  \n  \n  return (\n          <div className="App">\n            <header className="App-header">\n              Email:\n              <input\n                      ref={emailRef}\n                      type="text"\n                      id="email"\n                      name="message"\n\n              />\n              Password:\n              <input\n                      ref={passwordRef}\n                      type="text"\n                      id="password"\n                      name="message"\n              />\n              <button onClick={handleClick}>Register User</button>\n            </header>\n          </div>\n  );\n}\n\nexport default App;\n'})}),"\n",(0,i.jsx)(n.p,{children:'After filling the form and click on "Register User" you will get something similar in your console:'}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Register user result",src:t(5173).A+"",title:"The final result",width:"966",height:"1214"})}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"Using the simple-jwt-login SDK allows you to connect to WordPress with only a couple of lines of code. You don't need to worry about the endpoints or the request methods. You just need to make sure that you send all the required parameters."})]})}function d(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},3521:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/react-homescreen-fb92857bf62deccdaf98d2864e21e84d.png"},5248:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/react_register_form-b3cc25b60b5060880a0032e3b776efe3.png"},5173:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/react_register_user_console-6e4d807646c89ea8fd53e59ac89b75d9.png"},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>r});var s=t(6540);const i={},l=s.createContext(i);function o(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(l.Provider,{value:n},e.children)}},8563:e=>{e.exports=JSON.parse('{"permalink":"/website/blog/javascript-sdk-usage-react/","editUrl":"https://github.com/simple-jwt-login/website/tree/main/blog/2022-10-27-how_to_use_the_js_sdk.md","source":"@site/blog/2022-10-27-how_to_use_the_js_sdk.md","title":"How to use the JavaScript SDK in a React App","description":"In this tutorial you will see and real world example on how to use the simple-jwt-login JS SDK in a React App.","date":"2022-10-27T00:00:00.000Z","tags":[{"inline":false,"label":"Tutorial","permalink":"/website/blog/tags/tags/tutorial","description":"Tutorial"}],"readingTime":4.4,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Senior Engineer","url":"https://github.com/nicumicle","page":{"permalink":"/website/blog/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"How to use the JavaScript SDK in a React App","description":"In this tutorial you will see and real world example on how to use the simple-jwt-login JS SDK in a React App.","slug":"/javascript-sdk-usage-react/","hide_table_of_contents":false,"authors":"nicumicle","tags":["tutorials"]},"unlisted":false,"prevItem":{"title":"New Add-on for Simple-JWT-Login - Export-Import","permalink":"/website/blog/simple-jwt-login-export-import-add-on/"},"nextItem":{"title":"CORS Setup on Apache Server","permalink":"/website/blog/cors-setup-apache/"}}')}}]);