"use strict";(self.webpackChunksimple_jwt_login_website=self.webpackChunksimple_jwt_login_website||[]).push([[5494],{1217:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>a});var t=i(4848),s=i(8453);const o={slug:"/",title:"Introduction",sidebar_position:0,author:"Nicu Micle",author_url:"https://github.com/nicumicle"},l=void 0,r={id:"Introduction",title:"Introduction",description:"Simple-JWT-Login is a FREE WordPress plugin that allows you to use a JWT on WordPress REST endpoints.",source:"@site/docs/Introduction.md",sourceDirName:".",slug:"/",permalink:"/website/docs/",draft:!1,unlisted:!1,editUrl:"https://github.com/simple-jwt-login/website/tree/main/docs/Introduction.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{slug:"/",title:"Introduction",sidebar_position:0,author:"Nicu Micle",author_url:"https://github.com/nicumicle"},sidebar:"tutorialSidebar",next:{title:"Auth Codes",permalink:"/website/docs/auth-codes/"}},c={},a=[{value:"Installation",id:"installation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Request Parameters",id:"request-parameters",level:2},{value:"Get JWT from option",id:"get-jwt-from-option",level:2},{value:"Allow JWT usage on all endpoints",id:"allow-jwt-usage-on-all-endpoints",level:2},{value:"General settings screenshot",id:"general-settings-screenshot",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["Simple-JWT-Login is a ",(0,t.jsx)(n.strong,{children:"FREE"})," WordPress plugin that allows you to use a JWT on WordPress REST endpoints."]}),"\n",(0,t.jsx)(n.p,{children:"The main purpose of this plugin is to allow Mobile apps, or other websites to access the content from a WordPress website via REST endpoints in a secure way."}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.p,{children:"Here\u2019s how you install and activate the JWT-login plugin:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Download the Simple-JWT-login plugin from ",(0,t.jsx)(n.a,{href:"https://wordpress.org/plugins/simple-jwt-login",children:"https://wordpress.org/plugins/simple-jwt-login"}),"."]}),"\n",(0,t.jsx)(n.li,{children:"Upload the .zip file in your WordPress plugin directory."}),"\n",(0,t.jsx)(n.li,{children:"Activate the plugin from the \u201cPlugins\u201d menu in WordPress."}),"\n"]}),"\n",(0,t.jsx)("b",{children:"Or you can install it directly from WordPress"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Go to the ",(0,t.jsx)(n.em,{children:"Plugins"})," menu in WordPress and click ",(0,t.jsx)(n.code,{children:"Add New"})]}),"\n",(0,t.jsxs)(n.li,{children:["Search for '",(0,t.jsx)(n.em,{children:"Simple JWT Login"}),"' and select ",(0,t.jsx)(n.code,{children:"Install Now"})]}),"\n",(0,t.jsx)(n.li,{children:"Activate the plugin when prompted"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Go to \u201cGeneral section\u201d"}),"\n",(0,t.jsx)(n.li,{children:"Set a \u201cJWT Decryption key\u201d. With this key, we will validate your JWT."}),"\n",(0,t.jsx)(n.li,{children:"Choose \u201cJWT Decryption algorithm\u201d."}),"\n",(0,t.jsx)(n.li,{children:"Save Changes"}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsx)(n.p,{children:"For security reasons, please make sure you use a complex decryption key and also include special characters in your decryption key."})}),"\n",(0,t.jsx)(n.h2,{id:"request-parameters",children:"Request Parameters"}),"\n",(0,t.jsx)(n.p,{children:"You can send the request parameters:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Form Data"}),"\n",(0,t.jsx)(n.li,{children:"Query parameters"}),"\n",(0,t.jsx)(n.li,{children:"Request body ( as JSON )"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"get-jwt-from-option",children:"Get JWT from option"}),"\n",(0,t.jsxs)(n.p,{children:["By default, only the REQUEST is ",(0,t.jsx)(n.code,{children:"on"}),".  This means that the plugin will search in the request for the JWT."]}),"\n",(0,t.jsx)(n.p,{children:"Also, you set to search in:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["REQUEST ( plugin will search for the ",(0,t.jsx)(n.code,{children:"JWT"})," key : ",(0,t.jsx)(n.code,{children:"&JWT=your_jwt"}),")"]}),"\n",(0,t.jsxs)(n.li,{children:["SESSION ( plugin will search for the ",(0,t.jsx)(n.code,{children:"simple-jwt-login-token"})," key:  ",(0,t.jsx)(n.code,{children:"$_SESSION['simple-jwt-login-token']"}),")"]}),"\n",(0,t.jsxs)(n.li,{children:["COOKIE ( plugin will search for the ",(0,t.jsx)(n.code,{children:"simple-jwt-login-token"})," key: ",(0,t.jsx)(n.code,{children:"$_COOKIE['simple-jwt-login-token']"}),")"]}),"\n",(0,t.jsxs)(n.li,{children:["HEADER ( plugin will search in the ",(0,t.jsx)(n.code,{children:"Authorization"})," header: ",(0,t.jsx)(n.code,{children:"Authorization: Bearer YOUR_JWT_HERE"}),")"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"If JWT is provided in multiple places, the higher number of the option will overwrite the smaller one."}),"\n",(0,t.jsx)(n.p,{children:"For example, let's say you will send a JWT in REQUEST and in HEADER. The header JWT will be used."}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"I recommend you to enable the HEADER option, and always send the JWT in the header."})}),"\n",(0,t.jsx)(n.h2,{id:"allow-jwt-usage-on-all-endpoints",children:"Allow JWT usage on all endpoints"}),"\n",(0,t.jsx)(n.p,{children:'In order to use this feature, you will need to check "All WordPress endpoints checks for JWT authentication" in the "General" section.\nWhen a JWT is found, first, you will be authenticated as the user in the JWT, and then the call to the endpoint will be made.'}),"\n",(0,t.jsx)(n.p,{children:"For example, you can create posts, as a specific user, if you provide a JWT in your request."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-curl",children:'curl -X POST "https://simplejwtlogin.com/wp-json/wp/v2/posts?content=PostContent&title=PostTitle" -d \'{"JWT":"YOUR_JWT_HERE"}\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"or"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-curl",children:'curl -X POST "https://simplejwtlogin.com/wp-json/wp/v2/posts" -H "Authorization: Bearer YOUR_JWT_HERE" --form title="Title" --form content="My content" --form type="page"\n'})}),"\n",(0,t.jsx)(n.p,{children:"For the second example, you need to make sure that you allow search for JWT in the header( you can set this in: General settings -> Get JWT token from )"}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["When you pass the ",(0,t.jsx)(n.code,{children:"JWT"})," parameter, it is not case-sensitive. You can also pass it as ",(0,t.jsx)(n.code,{children:"jwt"}),"."]})}),"\n",(0,t.jsx)(n.h2,{id:"general-settings-screenshot",children:"General settings screenshot"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-2.png?raw=true",alt:""})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>r});var t=i(6540);const s={},o=t.createContext(s);function l(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);