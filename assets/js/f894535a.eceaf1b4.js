"use strict";(self.webpackChunksimple_jwt_login_website=self.webpackChunksimple_jwt_login_website||[]).push([[9704],{6316:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>a,contentTitle:()=>l,default:()=>d,frontMatter:()=>r,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"integrations/Google/Social_Login","title":"OAuth Login","description":"Enable OAuth on WordPress login","source":"@site/docs/integrations/Google/02_Social_Login.mdx","sourceDirName":"integrations/Google","slug":"/applications/google/login/","permalink":"/website/docs/applications/google/login/","draft":false,"unlisted":false,"editUrl":"https://github.com/simple-jwt-login/website/tree/main/docs/integrations/Google/02_Social_Login.mdx","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"slug":"/applications/google/login/","title":"OAuth Login","sidebar_position":2,"author":"Nicu Micle","author_url":"https://github.com/nicumicle"},"sidebar":"tutorialSidebar","previous":{"title":"Setup","permalink":"/website/docs/applications/google/setup"},"next":{"title":"Exchange OAuth Code with Google ID Token","permalink":"/website/docs/applications/google/oauth_code/"}}');var s=n(4848),i=n(8453);n(3168);const r={slug:"/applications/google/login/",title:"OAuth Login",sidebar_position:2,author:"Nicu Micle",author_url:"https://github.com/nicumicle"},l=void 0,a={},c=[{value:"Enable OAuth on WordPress login",id:"enable-oauth-on-wordpress-login",level:2},{value:"Create user if not exists",id:"create-user-if-not-exists",level:2},{value:"Screenshot",id:"screenshot",level:2}];function u(e){const o={a:"a",admonition:"admonition",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.h2,{id:"enable-oauth-on-wordpress-login",children:"Enable OAuth on WordPress login"}),"\n",(0,s.jsxs)(o.p,{children:["This ensures a seamless integration between your WordPress site and Google authentication, allowing for a secure and effective OAuth process.\nOnce this option is enabled, on the WordPress login/register screens there will appear a new button: ",(0,s.jsx)(o.code,{children:"Continue with Google"}),"."]}),"\n",(0,s.jsxs)(o.p,{children:["To enable OAuth on WordPress, it's crucial to ensure that you have the correct ",(0,s.jsx)(o.code,{children:"return_uri"})," configured in Google."]}),"\n",(0,s.jsxs)(o.admonition,{type:"note",children:[(0,s.jsxs)(o.p,{children:["Please make sure to set the following ",(0,s.jsx)(o.code,{children:"return_uri"}),' for "Authorized redirect URIs" in ',(0,s.jsx)(o.a,{href:"https://console.cloud.google.com",children:"https://console.cloud.google.com"}),":"]}),(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{children:"{{your_site}}/?rest_route=/simple-jwt-login/v1/oauth/token&provider=google\n"})})]}),"\n",(0,s.jsxs)(o.p,{children:["To enable the ",(0,s.jsx)(o.code,{children:"Continue with Google"})," button on your login screen, make sure you check the option ",(0,s.jsx)(o.code,{children:"Enable OAuth on WordPress login"})," from WordPress."]}),"\n",(0,s.jsx)(o.h2,{id:"create-user-if-not-exists",children:"Create user if not exists"}),"\n",(0,s.jsxs)(o.p,{children:["If you will have google users that may not have an account on WordPress, you can select the ",(0,s.jsx)(o.code,{children:"Create user if not exists"})," option from WordPress.\nIf somebody uses the OAuth flow, and if there is no user with  ",(0,s.jsx)(o.code,{children:"user_email"})," equal with email from google, it will automatically create a random user, with this email and a random password."]}),"\n",(0,s.jsx)(o.p,{children:"For example, a new user can have:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-json",children:'{\n    "user_login": "user_23werowe",\n    "user_email": "some_email@google.com",\n    "password": "some-random-generated-password"\n}\n'})}),"\n",(0,s.jsx)(o.h2,{id:"screenshot",children:"Screenshot"}),"\n",(0,s.jsx)(o.p,{children:(0,s.jsx)(o.img,{alt:"Google OAuth WordPress",src:n(1608).A+"",width:"355",height:"473"})})]})}function d(e={}){const{wrapper:o}={...(0,i.R)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},3168:(e,o,n)=>{n.d(o,{A:()=>t});const t={textCenter:"textCenter_m7wu",btn:"btn_muQv"}},1608:(e,o,n)=>{n.d(o,{A:()=>t});const t=n.p+"assets/images/oauth_login_google-5879378db4b48a47f8731e5b6a47f0ba.png"},8453:(e,o,n)=>{n.d(o,{R:()=>r,x:()=>l});var t=n(6540);const s={},i=t.createContext(s);function r(e){const o=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function l(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(i.Provider,{value:o},e.children)}}}]);