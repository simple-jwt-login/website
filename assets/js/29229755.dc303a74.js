"use strict";(self.webpackChunksimple_jwt_login_website=self.webpackChunksimple_jwt_login_website||[]).push([[6246],{71605:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>p,default:()=>h,frontMatter:()=>m,metadata:()=>r,toc:()=>u});const r=JSON.parse('{"id":"schemas/registeruserbody","title":"registerUserBody","description":"","source":"@site/api/schemas/registeruserbody.schema.mdx","sourceDirName":"schemas","slug":"/schemas/registeruserbody","permalink":"/api/schemas/registeruserbody","draft":false,"unlisted":false,"editUrl":null,"tags":[],"version":"current","frontMatter":{"id":"registeruserbody","title":"registerUserBody","description":"","sidebar_label":"registerUserBody","hide_title":true,"hide_table_of_contents":true,"schema":true,"sample":{"email":"test@simplejwtlogin.com","password":"string","user_login":"myuser","user_nicename":"myuser","user_url":"https://simplejwtlogin.com","display_name":"myuser","nickname":"myuser","first_name":"myuser","last_name":"myuser","description":"This is a sample description","rich_editing":true,"syntax_highlighting":true,"comment_shortcuts":"falsec","admin_color":"fresh","use_ssl":true,"user_registered":"2022-01-31 23:15:30","user_activation_key":"string","spam":false,"show_admin_bar_front":true,"locale":""},"custom_edit_url":null},"sidebar":"defaultSidebar","previous":{"title":"changePasswordBody","permalink":"/api/schemas/changepasswordbody"},"next":{"title":"resetPasswordBody","permalink":"/api/schemas/resetpasswordbody"}}');var i=t(74848),a=t(28453),n=t(50997),o=t.n(n),l=t(51107);const m={id:"registeruserbody",title:"registerUserBody",description:"",sidebar_label:"registerUserBody",hide_title:!0,hide_table_of_contents:!0,schema:!0,sample:{email:"test@simplejwtlogin.com",password:"string",user_login:"myuser",user_nicename:"myuser",user_url:"https://simplejwtlogin.com",display_name:"myuser",nickname:"myuser",first_name:"myuser",last_name:"myuser",description:"This is a sample description",rich_editing:!0,syntax_highlighting:!0,comment_shortcuts:"falsec",admin_color:"fresh",use_ssl:!0,user_registered:"2022-01-31 23:15:30",user_activation_key:"string",spam:!1,show_admin_bar_front:!0,locale:""},custom_edit_url:null},p=void 0,d={},u=[];function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.default,{as:"h1",className:"openapi__heading",children:"registerUserBody"}),"\n",(0,i.jsx)(o(),{schema:{type:"object",properties:{email:{type:"string",example:"test@simplejwtlogin.com",description:"User email address"},password:{type:"string",description:"User password"},user_login:{type:"string",description:"The user's login username.",example:"myuser"},user_nicename:{type:"string",description:"User URL-friendly username",example:"myuser"},user_url:{type:"string",description:"User URL",example:"https://simplejwtlogin.com"},display_name:{type:"string",description:"The user's display name. Default is the user's username.",example:"myuser"},nickname:{type:"string",description:"The user's nickname. Default is the user's username.",example:"myuser"},first_name:{type:"string",description:"The user's first name. For new users, will be used to build the first part of the user's display name if \"display_name\" is not specified.",example:"myuser"},last_name:{type:"string",description:"The user's last name. For new users, will be used to build the second part of the user's display name if \"display_name\" is not specified.",example:"myuser"},description:{type:"string",description:"The user's biographical description.",example:"This is a sample description"},rich_editing:{type:"string",description:"Whether to enable the rich-editor for the user. Accepts 'true' or 'false' as a string literal, not boolean. Default 'true'.",example:!0},syntax_highlighting:{type:"string",description:"Whether to enable the rich code editor for the user. Accepts 'true' or 'false' as a string literal, not boolean. Default 'true'.",example:!0},comment_shortcuts:{type:"string",description:"Whether to enable comment moderation keyboard shortcuts for the user. Accepts 'true' or 'false' as a string literal, not boolean. Default 'false'.",example:"falsec"},admin_color:{type:"string",description:"Admin color scheme for the user. Default 'fresh'.",example:"fresh"},use_ssl:{type:"boolean",description:"Whether the user should always access the admin over https. Default false.",example:!0},user_registered:{type:"string",description:"Date the user registered. Format is 'Y-m-d H:m:s'.",example:"2022-01-31 23:15:30"},user_activation_key:{type:"string",description:"Password reset key. Default empty."},spam:{type:"boolean",description:"Multisite only. Whether the user is marked as spam. Default false.",example:!1},show_admin_bar_front:{type:"string",description:"Whether to display the Admin Bar for the user on the site's front end.Accepts 'true' or 'false' as a string literal, not boolean. Default 'true'.",example:!0},locale:{type:"string",description:"User's locale. Default empty.",example:""}},required:["email","password"],title:"registerUserBody"},schemaType:"response"})]})}function h(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(c,{...e})}):c()}}}]);