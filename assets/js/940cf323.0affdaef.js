"use strict";(self.webpackChunkmy_site=self.webpackChunkmy_site||[]).push([[35],{2945:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var i=s(4848),t=s(8453);const l={title:"Release JavaScript SDK",description:"The Javascript SDK 0.1.0 has been released",slug:"/simple-jwt-login-js-sdk-0.1.1/",hide_table_of_contents:!1,authors:"nicumicle",tags:["release"]},r=void 0,o={permalink:"/blog/simple-jwt-login-js-sdk-0.1.1/",editUrl:"https://github.com/simple-jwt-login/website/tree/main/blog/2022-10-25-release-js-sdk.md",source:"@site/blog/2022-10-25-release-js-sdk.md",title:"Release JavaScript SDK",description:"The Javascript SDK 0.1.0 has been released",date:"2022-10-25T00:00:00.000Z",tags:[{inline:!1,label:"Release",permalink:"/blog/tags/tags/release",description:"Plugin Releases"}],readingTime:.875,hasTruncateMarker:!0,authors:[{name:"Nicu Micle",title:"Senior Engineer",url:"https://github.com/nicumicle",page:{permalink:"/blog/authors/nicumicle"},socials:{x:"https://x.com/nicumicle",github:"https://github.com/nicumicle"},imageURL:"https://github.com/nicumicle.png",key:"nicumicle"}],frontMatter:{title:"Release JavaScript SDK",description:"The Javascript SDK 0.1.0 has been released",slug:"/simple-jwt-login-js-sdk-0.1.1/",hide_table_of_contents:!1,authors:"nicumicle",tags:["release"]},unlisted:!1,prevItem:{title:"CORS Setup on Apache Server",permalink:"/blog/cors-setup-apache/"},nextItem:{title:"Simple JWT Login in the news",permalink:"/blog/simple-jwt-login-wp-glob/"}},a={authorsImageUrls:[void 0]},c=[];function p(e){const n={a:"a",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Finally, the JavaScript SDK for Simple JWT Login has been released.\nYou can now use it in your projects:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'npm install "simple-jwt-login"\n'})}),"\n",(0,i.jsx)(n.p,{children:"or if you prefer yarn:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'yarn add "simple-jwt-login"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["You can find the package code on github: ",(0,i.jsx)(n.a,{href:"https://github.com/simple-jwt-login/js-sdk",children:"https://github.com/simple-jwt-login/js-sdk"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Feel free to star the repository, check the code, create issues or even share it on social media."}),"\n",(0,i.jsx)(n.p,{children:"Now, with just a few lines of code, you are able to call Simple-JWT-Login endpoints."}),"\n",(0,i.jsx)(n.p,{children:"Here is a simple register example using the JS SDK:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { SimpleJwtLogin } from "simple-jwt-login";\n\nconst simpleJwtLogin = new SimpleJwtLogin(\n  "http://your-domain.com",\n  "/simple-jwt-login/v1",\n  "AUTH_KEY"\n);\nlet params = {\n  email: "me@mydomain.com",\n  password: "my-secret-password",\n  nickname: "coolnickname",\n};\n\nlet result = simpleJwtLogin.registerUser(params, "MY_AUTH_KEY");\n'})}),"\n",(0,i.jsx)(n.p,{children:"And voil\xe0. A new user is registered."}),"\n",(0,i.jsx)(n.p,{children:"With this SDK, with just a few lines of code, you can:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Autologin to WordPress"}),"\n",(0,i.jsx)(n.li,{children:"Delete a user"}),"\n",(0,i.jsx)(n.li,{children:"Register a user"}),"\n",(0,i.jsx)(n.li,{children:"Reset user password"}),"\n",(0,i.jsx)(n.li,{children:"Change user password"}),"\n",(0,i.jsx)(n.li,{children:"Authenticate into WordPress"}),"\n",(0,i.jsx)(n.li,{children:"Refresh a token"}),"\n",(0,i.jsx)(n.li,{children:"Validate a token"}),"\n",(0,i.jsx)(n.li,{children:"Revoke a token"}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>o});var i=s(6540);const t={},l=i.createContext(t);function r(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);