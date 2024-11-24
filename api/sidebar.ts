import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "simple-jwt-login",
    },
    {
      type: "category",
      label: "login_user",
      items: [
        {
          type: "doc",
          id: "autologin",
          label: "Autologin user into WordPress",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "register_user",
      items: [
        {
          type: "doc",
          id: "register-word-press-user",
          label: "Register WordPress user",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "delete_user",
      items: [
        {
          type: "doc",
          id: "delete-user",
          label: "Delete WordPress user",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "reset_password",
      items: [
        {
          type: "doc",
          id: "send-reset-password-code",
          label: "Send reset password code",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "change-user-password",
          label: "Change user password",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "authenticate_user",
      items: [
        {
          type: "doc",
          id: "get-jwt",
          label: "Authenticate to your WordPress website",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "refresh-jwt",
          label: "Refresh expired JWT",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "validate-jwt",
          label: "Validate JWT",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "revoke-jwt",
          label: "Revoke JWT",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "schemas/responseerror",
          label: "ResponseError",
          className: "schema",
        },
        {
          type: "doc",
          id: "schemas/registeruserbody",
          label: "registerUserBody",
          className: "schema",
        },
        {
          type: "doc",
          id: "schemas/authbody",
          label: "authBody",
          className: "schema",
        },
        {
          type: "doc",
          id: "schemas/authrefreshbody",
          label: "authRefreshBody",
          className: "schema",
        },
        {
          type: "doc",
          id: "schemas/authrevokebody",
          label: "authRevokeBody",
          className: "schema",
        },
        {
          type: "doc",
          id: "schemas/resetpasswordbody",
          label: "resetPasswordBody",
          className: "schema",
        },
        {
          type: "doc",
          id: "schemas/changepasswordbody",
          label: "changePasswordBody",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
