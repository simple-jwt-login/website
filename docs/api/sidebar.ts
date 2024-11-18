import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/simple-jwt-login",
    },
    {
      type: "category",
      label: "login_user",
      items: [
        {
          type: "doc",
          id: "api/autologin",
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
          id: "api/register-word-press-user",
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
          id: "api/delete-user",
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
          id: "api/send-reset-password-code",
          label: "Send reset password code",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/change-user-password",
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
          id: "api/get-jwt",
          label: "Authenticate to your WordPress website",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/refresh-jwt",
          label: "Refresh expired JWT",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/validate-jwt",
          label: "Validate JWT",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/revoke-jwt",
          label: "Revoke JWT",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
