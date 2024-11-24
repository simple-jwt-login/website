"use strict";(self.webpackChunksimple_jwt_login_website=self.webpackChunksimple_jwt_login_website||[]).push([[2258],{44655:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>r,toc:()=>c});var r=s(27987),n=s(74848),l=s(28453);const t={title:"New Plugin Release 3.4.5",description:"Released version 3.4.5",slug:"/simple-jwt-login-release-3.4.5/",hide_table_of_contents:!1,authors:"nicumicle",tags:["feature"]},o=void 0,a={authorsImageUrls:[void 0]},c=[{value:"1. Add Redirect on Fail",id:"1-add-redirect-on-fail",level:2},{value:"2. Shortcode for displaying Autologin errors",id:"2-shortcode-for-displaying-autologin-errors",level:2}];function d(e){const i={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i.p,{children:["The version ",(0,n.jsx)(i.code,{children:"3.4.5"})," has been released today on ",(0,n.jsx)(i.a,{href:"https://wordpress.org/plugins/simple-jwt-login",children:"WordPress"}),"."]}),"\n",(0,n.jsx)(i.p,{children:"New cool features have been included."}),"\n",(0,n.jsx)(i.p,{children:"The following changes have been deployed:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Add Redirect on Fail Autologin"}),"\n",(0,n.jsx)(i.li,{children:"Shortcode for displaying Autologin errors"}),"\n"]}),"\n",(0,n.jsx)(i.h2,{id:"1-add-redirect-on-fail",children:"1. Add Redirect on Fail"}),"\n",(0,n.jsx)(i.p,{children:"This feature will allow you to set a Redirect URL in case the Autologin fails."}),"\n",(0,n.jsx)(i.p,{children:"The autologin can fail, if the JWT is invalid, or if it is expired. This way, you can display a cool page to your users."}),"\n",(0,n.jsx)(i.h2,{id:"2-shortcode-for-displaying-autologin-errors",children:"2. Shortcode for displaying Autologin errors"}),"\n",(0,n.jsx)(i.p,{children:"The new shortcode can be used to display the failed autologin error."}),"\n",(0,n.jsx)(i.p,{children:"The shortcode looks like this:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'  [simple-jwt-login:request key="error_code"]\n'})}),"\n",(0,n.jsx)(i.p,{children:"or"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'  [simple-jwt-login:request key="error_message"]\n'})}),"\n",(0,n.jsx)(i.p,{children:"Also, in case you have extra query parameters in your URL, you can display them using this shortcode. You just need to set the key of the Query parameter."}),"\n",(0,n.jsx)(i.p,{children:"URL Example:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:"https://simplejwtlogin.com?my_parameter=test&error_code=21&error_message=This is an error\n"})}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:'[simple-jwt-login:request key="error_code"]'})," will display : ",(0,n.jsx)(i.code,{children:"21"})]}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:'[simple-jwt-login:request key="error_message"]'})," will display : ",(0,n.jsx)(i.code,{children:"This is an error"})]}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.code,{children:'[simple-jwt-login:request key="my_parameter"]'})," will display : ",(0,n.jsx)(i.code,{children:"test"})]}),"\n",(0,n.jsx)(i.admonition,{type:"note",children:(0,n.jsx)(i.p,{children:"These Shortcodes will remove all the HTML tags"})})]})}function h(e={}){const{wrapper:i}={...(0,l.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},28453:(e,i,s)=>{s.d(i,{R:()=>t,x:()=>o});var r=s(96540);const n={},l=r.createContext(n);function t(e){const i=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:t(e.components),r.createElement(l.Provider,{value:i},e.children)}},27987:e=>{e.exports=JSON.parse('{"permalink":"/website/releases/simple-jwt-login-release-3.4.5/","source":"@site/releases/2022-04-11-release-3.4.5.md","title":"New Plugin Release 3.4.5","description":"Released version 3.4.5","date":"2022-04-11T00:00:00.000Z","tags":[{"inline":true,"label":"feature","permalink":"/website/releases/tags/feature"}],"readingTime":0.905,"hasTruncateMarker":true,"authors":[{"name":"Nicu Micle","title":"Creator of Simple JWT Login","url":"https://github.com/nicumicle","page":{"permalink":"/website/releases/authors/nicumicle"},"socials":{"x":"https://x.com/nicumicle","github":"https://github.com/nicumicle"},"imageURL":"https://github.com/nicumicle.png","key":"nicumicle"}],"frontMatter":{"title":"New Plugin Release 3.4.5","description":"Released version 3.4.5","slug":"/simple-jwt-login-release-3.4.5/","hide_table_of_contents":false,"authors":"nicumicle","tags":["feature"]},"unlisted":false,"prevItem":{"title":"New Plugin Release 3.4.7","permalink":"/website/releases/simple-jwt-login-release-3.4.7/"},"nextItem":{"title":"New Plugin Release 3.4.4","permalink":"/website/releases/simple-jwt-login-release-3.4.4/"}}')}}]);