import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "simple-jwt-login",
      label: "Introduction",
    },
    {
      type: "category",
      label: "Routes",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "autologin",
          label: "Auto-login user into WordPress",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "register-a-new-word-press-user",
          label: "Register a new WordPress user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "delete-user",
          label: "Delete a WordPress user",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "send-reset-password-code",
          label: "Send reset password email",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "change-user-password",
          label: "Change user password",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "get-jwt",
          label: "Authenticate and obtain a JWT",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "refresh-jwt",
          label: "Refresh an expired JWT",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "validate-jwt",
          label: "Validate a JWT and retrieve user details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "validate-jwt-post",
          label: "Validate a JWT and retrieve user details (POST variant)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "revoke-jwt",
          label: "Revoke a JWT",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "verify-two-factor",
          label: "Verify Two-Factor Authentication code",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "OAuth",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "oauth-token-get",
          label: "Exchange OAuth authorization code for a WordPress JWT (GET)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "oauth-token-post",
          label: "Exchange OAuth token for a WordPress JWT (POST)",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "API Keys",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "list-api-keys",
          label: "List API keys",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "create-api-key",
          label: "Create an API key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "update-api-key",
          label: "Update an API key",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "delete-api-key",
          label: "Permanently delete an API key",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "revoke-api-key",
          label: "Revoke an API key",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar;
