"use strict";(self.webpackChunkmy_site=self.webpackChunkmy_site||[]).push([[2416],{4295:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>a,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var s=n(4848),r=n(8453);const o={slug:"/revoke-token/",title:"Revoke token",author:"Nicu Micle",author_url:"https://github.com/nicumicle"},i=void 0,l={id:"auth/RevokeToken",title:"Revoke token",description:'If you want to make sure a token can not be used anymore, just revoke it. This endpoint should be used on "log out".',source:"@site/docs/auth/RevokeToken.md",sourceDirName:"auth",slug:"/revoke-token/",permalink:"/docs/revoke-token/",draft:!1,unlisted:!1,editUrl:"https://github.com/simple-jwt-login/website/tree/main/docs/auth/RevokeToken.md",tags:[],version:"current",frontMatter:{slug:"/revoke-token/",title:"Revoke token",author:"Nicu Micle",author_url:"https://github.com/nicumicle"},sidebar:"tutorialSidebar",previous:{title:"Refresh token",permalink:"/docs/refresh-token/"},next:{title:"Validate token",permalink:"/docs/validate-token/"}},c={},d=[{value:"Request",id:"request",level:2},{value:"Responses",id:"responses",level:2},{value:"200",id:"200",level:3},{value:"400",id:"400",level:3},{value:"Examples",id:"examples",level:2},{value:"SHELL",id:"shell",level:3},{value:"PHP",id:"php",level:3},{value:"Screenshot",id:"screenshot",level:2}];function h(e){const t={code:"code",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:'If you want to make sure a token can not be used anymore, just revoke it. This endpoint should be used on "log out".'}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"METHOD"})," : ",(0,s.jsx)(t.code,{children:"POST"})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"ENDPOINT"}),": ",(0,s.jsx)(t.code,{children:"/simple-jwt-login/v1/auth/revoke"})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"URL Example"})," : ",(0,s.jsx)(t.code,{children:"https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT={{YOUR_JWT}}"})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"PARAMETERS"}),":"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Parameter"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"JWT"}),(0,s.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,s.jsx)(t.code,{children:"required"})," ",(0,s.jsx)(t.code,{children:"string"})]}),(0,s.jsx)(t.td,{children:"Your JWT"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"AUTH_CODE"}),(0,s.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,s.jsx)(t.code,{children:"optional"})," ",(0,s.jsx)(t.code,{children:"string"})]}),(0,s.jsx)(t.td,{children:'Auth Code from the "Auth codes" section. Required only if "Authentication Requires Auth Code" is enabled.'})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"request",children:"Request"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "JWT" : "YOUR_JWT_HERE",\n  "AUTH_CODE": "MySecretAuthCode"\n}\n'})}),"\n",(0,s.jsx)(t.h2,{id:"responses",children:"Responses"}),"\n",(0,s.jsx)(t.h3,{id:"200",children:"200"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:' {\n     "success": true,\n     "message": "Token was revoked"\n     "data": {\n         "jwt": {\n            "NEW_GENERATED_JWT_HERE"\n          }\n     }\n }\n'})}),"\n",(0,s.jsx)(t.h3,{id:"400",children:"400"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "success": false,\n  "error" : "Error message"\n}\n'})}),"\n",(0,s.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsx)(t.h3,{id:"shell",children:"SHELL"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:'curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/revoke -d \'{"JWT":"YOUR_JWT"}\'\n'})}),"\n",(0,s.jsx)(t.h3,{id:"php",children:"PHP"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"$simpleJwtLogin = new \\SimpleJwtLoginClient\\SimpleJwtLoginClient('https://simplejwtlogin.com', '/simple-jwt-login/v1'); \n$result = $simpleJwtLogin->revokeToken('Your JWT here', 'AUTH CODE');\n"})}),"\n",(0,s.jsx)(t.h2,{id:"screenshot",children:"Screenshot"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{src:"https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true",alt:""})})]})}function a(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>l});var s=n(6540);const r={},o=s.createContext(r);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);