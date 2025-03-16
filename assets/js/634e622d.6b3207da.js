"use strict";(self.webpackChunksimple_jwt_login_website=self.webpackChunksimple_jwt_login_website||[]).push([[9833],{94779:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>t,toc:()=>o});const t=JSON.parse('{"id":"reset_password/Reset-Password","title":"Reset password","description":"This endpoint will trigger the reset password, and the user will be informed about this change.","source":"@site/docs/reset_password/Reset-Password.md","sourceDirName":"reset_password","slug":"/reset-password/","permalink":"/docs/reset-password/","draft":false,"unlisted":false,"editUrl":"https://github.com/simple-jwt-login/website/tree/main/docs/reset_password/Reset-Password.md","tags":[],"version":"current","frontMatter":{"slug":"/reset-password/","title":"Reset password","author":"Nicu Micle","author_url":"https://github.com/nicumicle"},"sidebar":"tutorialSidebar","previous":{"title":"Change password","permalink":"/docs/change-password/"},"next":{"title":"Delete WordPress User","permalink":"/docs/delete-user/"}}');var r=n(74848),l=n(28453);const i={slug:"/reset-password/",title:"Reset password",author:"Nicu Micle",author_url:"https://github.com/nicumicle"},d=void 0,c={},o=[{value:"Request",id:"request",level:2},{value:"Response",id:"response",level:2},{value:"200",id:"200",level:3},{value:"400",id:"400",level:3},{value:"Examples",id:"examples",level:2},{value:"SHELL",id:"shell",level:3},{value:"PHP",id:"php",level:3},{value:"JavaScript",id:"javascript",level:3},{value:"Screenshot",id:"screenshot",level:2},{value:"Features",id:"features",level:2},{value:"Custom email",id:"custom-email",level:3},{value:"Send custom email variables:",id:"send-custom-email-variables",level:3},{value:"Hooks:",id:"hooks",level:3}];function a(e){const s={code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.p,{children:"This endpoint will trigger the reset password, and the user will be informed about this change."}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"METHOD"})," : ",(0,r.jsx)(s.code,{children:"POST"})]}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"ENDPOINT"})," : ",(0,r.jsx)(s.code,{children:"/simple-jwt-login/v1/users/reset_password"})]}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"URL Example"})," : ",(0,r.jsx)(s.code,{children:"https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users/reset_password&email={{email}}&code={{code}}&&new_password={{new_password}}&AUTH_KEY={{AUTH_KEY_VALUE}}"})]}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"PARAMETERS"}),":"]}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{style:{textAlign:"center"},children:"Parameter"}),(0,r.jsx)(s.th,{style:{textAlign:"center"},children:"Type"}),(0,r.jsx)(s.th,{children:"Description"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:"email"}),(0,r.jsxs)(s.td,{style:{textAlign:"center"},children:[(0,r.jsx)(s.code,{children:"required"})," ",(0,r.jsx)(s.code,{children:"string"})]}),(0,r.jsx)(s.td,{children:"The email that requests the password change"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:"AUTH_CODE"}),(0,r.jsxs)(s.td,{style:{textAlign:"center"},children:[(0,r.jsx)(s.code,{children:"optional"})," ",(0,r.jsx)(s.code,{children:"string"})]}),(0,r.jsx)(s.td,{children:'Required only when option "Reset password requires AUTH CODE".'})]})]})]}),"\n",(0,r.jsx)(s.h2,{id:"request",children:"Request"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-json",children:'{\n  "email" : "my_email",\n  "AUTH_CODE" : "MY_SECRET_AUTH_KEY"\n}\n'})}),"\n",(0,r.jsx)(s.h2,{id:"response",children:"Response"}),"\n",(0,r.jsx)(s.h3,{id:"200",children:"200"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-json",children:'{\n  "success": true,\n  "message": "Reset password email has been sent."\n}\n'})}),"\n",(0,r.jsx)(s.h3,{id:"400",children:"400"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-json",children:'{\n  "success": false,\n  "data": {\n    "message": "string",\n    "errorCode": 0\n  }\n}\n'})}),"\n",(0,r.jsx)(s.h2,{id:"examples",children:"Examples"}),"\n",(0,r.jsx)(s.h3,{id:"shell",children:"SHELL"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:'curl -X POST https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users/reset_password \\\n-d \'{"email":"test@simplejwtlogin.com", "AUTH_CODE": "123"}\'\n'})}),"\n",(0,r.jsx)(s.h3,{id:"php",children:"PHP"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-php",children:"$simpleJwtLogin = new \\SimpleJwtLoginClient\\SimpleJwtLoginClient(\n    'https://simplejwtlogin.com',\n    '/simple-jwt-login/v1'\n);\n$result = $simpleJwtLogin->resetPassword('email@simplejwtlogin.com', 'AUTH CODE');\n"})}),"\n",(0,r.jsx)(s.h3,{id:"javascript",children:"JavaScript"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-js",children:'var data = JSON.stringify({\n    "email":"test@simplejwtlogin.com",\n    "code": "123",\n    "new_password": "test"\n});\n\nvar xhr = new XMLHttpRequest();\nxhr.withCredentials = true;\n\nxhr.addEventListener("readystatechange", function() {\n    if(this.readyState === 4) {\n        console.log(this.responseText);\n    }\n});\n\nxhr.open("POST", "https://simplejwtlogin.com" + "/simple-jwt-login/v1/users/reset_password");\nxhr.setRequestHeader("Content-Type", "application/json");\n\nxhr.send(data);\n'})}),"\n",(0,r.jsx)(s.h2,{id:"screenshot",children:"Screenshot"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.img,{src:"https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-6.png?raw=true",alt:""})}),"\n",(0,r.jsx)(s.h2,{id:"features",children:"Features"}),"\n",(0,r.jsx)(s.p,{children:"Send reset password offers 3 possible modes:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Do not send any email, just save reset code in the database"}),"\n",(0,r.jsx)(s.li,{children:"Send the default WordPress reset password email"}),"\n",(0,r.jsx)(s.li,{children:"Send custom email"}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"custom-email",children:"Custom email"}),"\n",(0,r.jsx)(s.p,{children:"When you choose custom email template, you can set how the email can be sent:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"plain text"}),"\n",(0,r.jsx)(s.li,{children:"HTML"}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"Also, you can set a custom email subject and custom email body."}),"\n",(0,r.jsx)(s.h3,{id:"send-custom-email-variables",children:"Send custom email variables:"}),"\n",(0,r.jsx)(s.p,{children:"These variables can be used inside the email body template. They will be replaced when the email will be sent."}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{style:{textAlign:"center"},children:"Variable"}),(0,r.jsx)(s.th,{children:"Description"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:(0,r.jsx)(s.code,{children:"{{CODE}}"})}),(0,r.jsxs)(s.td,{children:[(0,r.jsx)(s.code,{children:"madatory"}),"  The reset password Code"]})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:(0,r.jsx)(s.code,{children:"{{NAME}}"})}),(0,r.jsx)(s.td,{children:"User first and last name"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:(0,r.jsx)(s.code,{children:"{{EMAIL}}"})}),(0,r.jsx)(s.td,{children:"User email address"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:(0,r.jsx)(s.code,{children:"{{NICKNAME}}"})}),(0,r.jsx)(s.td,{children:"User nickname"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:(0,r.jsx)(s.code,{children:"{{FIST_NAME}}"})}),(0,r.jsx)(s.td,{children:"User first name"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:(0,r.jsx)(s.code,{children:"{{LAST_NAME}}"})}),(0,r.jsx)(s.td,{children:"User last name"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:(0,r.jsx)(s.code,{children:"{{SITE}}"})}),(0,r.jsx)(s.td,{children:"Website URL"})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{style:{textAlign:"center"},children:(0,r.jsx)(s.code,{children:"{{IP}}"})}),(0,r.jsx)(s.td,{children:"Client IP"})]})]})]}),"\n",(0,r.jsx)(s.p,{children:"Email body example:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{children:"    Welcome {{LAST_NAME}},\n    \n    Your reset code for {{SITE}} is {{CODE}}.\n    \n    This reset email has been generated from: {{IP}}\n"})}),"\n",(0,r.jsx)(s.h3,{id:"hooks",children:"Hooks:"}),"\n",(0,r.jsx)(s.p,{children:"In order to use a custom email template for reset password, you can use the simple_jwt_login_hook."}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-php",children:"add_filter('simple_jwt_login_reset_password_custom_email_template', function($template, $request) {\n   return \"\n        Hello {{FIRST_NAME}},\n        Here is your reset password code. \n        \n        <b>Your code</b>: {{CODE}}\n   \";\n}, 10, 2);\n"})})]})}function h(e={}){const{wrapper:s}={...(0,l.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>i,x:()=>d});var t=n(96540);const r={},l=t.createContext(r);function i(e){const s=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(l.Provider,{value:s},e.children)}}}]);