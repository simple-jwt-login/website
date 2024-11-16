"use strict";(self.webpackChunkmy_site=self.webpackChunkmy_site||[]).push([[8687],{4594:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>o});var n=s(4848),r=s(8453);const i={slug:"/register-user/",title:"Register User",sidebar_position:4,author:"Nicu Micle",author_url:"https://github.com/nicumicle"},l=void 0,d={id:"Register-User",title:"Register User",description:"Description",source:"@site/docs/Register-User.md",sourceDirName:".",slug:"/register-user/",permalink:"/docs/register-user/",draft:!1,unlisted:!1,editUrl:"https://github.com/simple-jwt-login/website/tree/main/docs/Register-User.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{slug:"/register-user/",title:"Register User",sidebar_position:4,author:"Nicu Micle",author_url:"https://github.com/nicumicle"},sidebar:"tutorialSidebar",previous:{title:"Autologin",permalink:"/docs/autologin/"},next:{title:"Change password",permalink:"/docs/change-password/"}},c={},o=[{value:"Description",id:"description",level:2},{value:"Endpoint",id:"endpoint",level:2},{value:"Request",id:"request",level:2},{value:"Responses",id:"responses",level:2},{value:"200",id:"200",level:3},{value:"400",id:"400",level:3},{value:"Examples",id:"examples",level:2},{value:"SHELL",id:"shell",level:3},{value:"PHP",id:"php",level:3},{value:"JavaScript",id:"javascript",level:3},{value:"Screenshot",id:"screenshot",level:2},{value:"Features",id:"features",level:2},{value:"New types of users",id:"new-types-of-users",level:3},{value:"Limit user registration",id:"limit-user-registration",level:3},{value:"Random password generator",id:"random-password-generator",level:3},{value:"Force login flow after register",id:"force-login-flow-after-register",level:3},{value:"Custom user meta",id:"custom-user-meta",level:3},{value:"FAQ",id:"faq",level:2},{value:"How we can set up?",id:"how-we-can-set-up",level:3}];function a(e){const t={code:"code",h2:"h2",h3:"h3",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"description",children:"Description"}),"\n",(0,n.jsx)(t.p,{children:"This plugin also allows you to create WordPress users."}),"\n",(0,n.jsx)(t.p,{children:"This option is disabled by default, but you can enable it at any time."}),"\n",(0,n.jsx)(t.p,{children:"In order to create users, you just have to make a POST request to the route URL, and send an email and a password as parameter and the new user will be created."}),"\n",(0,n.jsx)(t.h2,{id:"endpoint",children:"Endpoint"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"METHOD"}),":  ",(0,n.jsx)(t.code,{children:"POST"})]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"ENDPOINT"}),": ",(0,n.jsx)(t.code,{children:"/simple-jwt-login/v1/users"})]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"URL Example"}),": ",(0,n.jsx)(t.code,{children:"https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/users&email=NEW_USER_EMAIL&password=NEW_USER_PASSWORD"})]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"PARAMETERS"}),":"]}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Parameter"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Type"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"email"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"required"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The user email address."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"password"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"required"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The plain-text user password."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"user_login"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The user\u2019s login username."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"user_nicename"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The URL-friendly username."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"user_url"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The user URL."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"display_name"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The user\u2019s display name. Default is the user\u2019s username."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"nickname"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The user\u2019s nickname. Default is the user\u2019s username."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"first_name"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The user\u2019s first name. For new users, will be used to build the first part of the user\u2019s display name if $display_name is not specified."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"last_name"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The user\u2019s last name. For new users, will be used to build the second part of the user\u2019s display name if $display_name is not specified."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"description"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"The user\u2019s biographical description."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"rich_editing"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"Whether to enable the rich-editor for the user. Accepts \u2018true\u2019 or \u2018false\u2019 as a string literal, not boolean. Default \u2018true\u2019."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"syntax_highlighting"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"Whether to enable the rich code editor for the user. Accepts \u2018true\u2019 or \u2018false\u2019 as a string literal, not boolean. Default \u2018true\u2019."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"comment_shortcuts"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"Whether to enable comment moderation keyboard shortcuts for the user. Accepts \u2018true\u2019 or \u2018false\u2019 as a string literal, not boolean. Default \u2018false\u2019."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"admin_color"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"Admin color scheme for the user. Default \u2018fresh\u2019."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"use_ssl"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"boolean"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"Whether the user should always access the admin over https. Default false."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"user_registered"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:["Date the user registered. Format is ",(0,n.jsx)(t.code,{children:"Year-Month-Date Hours:Minutes:Seconds"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"user_activation_key"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"Password reset key. Default empty."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"spam"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"boolean"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"Multisite only. Whether the user is marked as spam. Default false."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"show_admin_bar_front"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"Whether to display the Admin Bar for the user on the site\u2019s front end. Accepts \u2018true\u2019 or \u2018false\u2019 as a string literal, not boolean. Default \u2018true\u2019."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"locale"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"User\u2019s locale. Default empty."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"center"},children:"user_meta"}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:[(0,n.jsx)(t.code,{children:"optional"})," ",(0,n.jsx)(t.code,{children:"string"})]}),(0,n.jsxs)(t.td,{style:{textAlign:"center"},children:["Add user meta on user registration. It should be a JSON string. Example: ",(0,n.jsx)(t.code,{children:'{"meta_key":"meta_value","meta_key2":"meta_value"}'})]})]})]})]}),"\n",(0,n.jsx)(t.h2,{id:"request",children:"Request"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",children:'{\n  "email": "test@simplejwtlogin.com",\n  "password": "string",\n  "user_login": "myuser",\n  "user_nicename": "myuser",\n  "user_url": "https://simplejwtlogin.com",\n  "display_name": "myuser",\n  "nickname": "myuser",\n  "first_name": "myuser",\n  "last_name": "myuser",\n  "description": "This is a sample description",\n  "rich_editing": true,\n  "syntax_highlighting": true,\n  "comment_shortcuts": "falsec",\n  "admin_color": "fresh",\n  "use_ssl": true,\n  "user_registered": "2022-01-31 23:15:30",\n  "user_activation_key": "string",\n  "spam": false,\n  "show_admin_bar_front": true,\n  "locale": ""\n}\n'})}),"\n",(0,n.jsx)(t.h2,{id:"responses",children:"Responses"}),"\n",(0,n.jsx)(t.h3,{id:"200",children:"200"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",children:'{\n  "success": true,\n  "id": 1,\n  "message": "User was successfully created.",\n  "user": {\n    "ID": 1,\n    "user_login": "myusser",\n    "user_nicename": "My  User",\n    "user_email": "myuser@simplejwtlogin.com",\n    "user_url": "https://simplejwtlogin.com",\n    "user_registered": "2021-01-01 23:31:50",\n    "user_activation_key": "test",\n    "user_status": "0",\n    "display_name": "myuser",\n    "user_level": 10\n  },\n  "roles": [\n    "administrator"\n  ],\n  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"\n}\n'})}),"\n",(0,n.jsx)(t.h3,{id:"400",children:"400"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",children:'{\n  "success": false,\n  "data": {\n    "message": "Error message string",\n    "errorCode": 0\n  }\n}\n'})}),"\n",(0,n.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(t.h3,{id:"shell",children:"SHELL"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:'curl -X POST \'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users\'  -d \'{"email":"myemail@simplejwtlogin.com", "password":"test"}\'\n'})}),"\n",(0,n.jsx)(t.h3,{id:"php",children:"PHP"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-php",children:"$simpleJwtLogin = new \\SimpleJwtLoginClient\\SimpleJwtLoginClient('https://simplejwtlogin.com', '/simple-jwt-login/v1');\n$result = $simpleJwtLogin->registerUser('email@simplejwtlogin.com', 'password', 'AUTH CODE');\n"})}),"\n",(0,n.jsx)(t.h3,{id:"javascript",children:"JavaScript"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:'var data = JSON.stringify({\n    "email": "email@simplejwtlogin.com",\n    "password":"my-secret-passwor",\n    "AUTH_CODE":"my-auth-code"\n});\n\nvar xhr = new XMLHttpRequest();\nxhr.withCredentials = true;\n\nxhr.addEventListener("readystatechange", function() {\n    if(this.readyState === 4) {\n        console.log(this.responseText);\n    }\n});\n\nxhr.open("POST", "https://simplejwtlogin.com" + "/simple-jwt-login/v1/users");\nxhr.setRequestHeader("Content-Type", "application/json");\n\nxhr.send(data);\n'})}),"\n",(0,n.jsx)(t.h2,{id:"screenshot",children:"Screenshot"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:"https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-4.png?raw=true",alt:""})}),"\n",(0,n.jsx)(t.h2,{id:"features",children:"Features"}),"\n",(0,n.jsx)(t.h3,{id:"new-types-of-users",children:"New types of users"}),"\n",(0,n.jsx)(t.p,{children:"You can select the type for the new users:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"editor"}),"\n",(0,n.jsx)(t.li,{children:"author"}),"\n",(0,n.jsx)(t.li,{children:"contributor"}),"\n",(0,n.jsx)(t.li,{children:"subscriber"}),"\n",(0,n.jsx)(t.li,{children:"any custom role that you have set up in your WordPress"}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Also, you can set a specific user role on Auth Codes, and when that ",(0,n.jsx)(t.code,{children:"AUTH_CODE"})," is used, the user will be created with that specific user role."]}),"\n",(0,n.jsx)(t.h3,{id:"limit-user-registration",children:"Limit user registration"}),"\n",(0,n.jsx)(t.p,{children:"Also, you can limit the user creating only for specific IP addresses or specific email domains."}),"\n",(0,n.jsx)(t.h3,{id:"random-password-generator",children:"Random password generator"}),"\n",(0,n.jsx)(t.p,{children:"Another cool option is \u201cGenerate a random password when a new user is created\u201d.\nIf this option is selected, the password is no more required when a new user is created, instead, a random password will be generated."}),"\n",(0,n.jsxs)(t.p,{children:["Also, you can specify the length of the random password. The minimum length is ",(0,n.jsx)(t.code,{children:"6"})," characters, and the maximum is ",(0,n.jsx)(t.code,{children:"255"}),"."]}),"\n",(0,n.jsx)(t.h3,{id:"force-login-flow-after-register",children:"Force login flow after register"}),"\n",(0,n.jsx)(t.p,{children:"Another option that you have for registered users is \u201cInitialize force login after register\u201d.\nWhen the user registration is completed, the user will continue on the flow configured on the login configuration."}),"\n",(0,n.jsx)(t.p,{children:"If auto-login is disabled, this feature will not work and the registered user will go on a normal flow and return a JSON response."}),"\n",(0,n.jsx)(t.h3,{id:"custom-user-meta",children:"Custom user meta"}),"\n",(0,n.jsx)(t.p,{children:"If you want to add custom user_meta on user creation, just add the parameter user_meta with a JSON.\nThis will create user_meta for the new user."}),"\n",(0,n.jsx)(t.p,{children:"Example:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"user_meta={\u201cmeta_key\u201d:\u201dmeta_value\u201d,\u201dmeta_key2\u2033:\u201dmeta_value\u201d}\n"})}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h2,{id:"faq",children:"FAQ"}),"\n",(0,n.jsx)(t.h3,{id:"how-we-can-set-up",children:"How we can set up?"}),"\n",(0,n.jsx)(t.p,{children:"In order to set up, please follow the guidelines."})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>l,x:()=>d});var n=s(6540);const r={},i=n.createContext(r);function l(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);