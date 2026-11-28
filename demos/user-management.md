[ ](/demos.md)

<!-- -->

[All demos](/demos.md)

# WordPress user management

Sign in with your WordPress credentials, then list, search, and delete user accounts - all authenticated with a JWT in the Authorization header. Requires an Administrator account; any other role is denied access.

**Before it works,** on your WordPress site: enable CORS for this origin and sign in with an **Administrator** account - listing and deleting other users needs the `list_users` / `delete_users` capability. Deleting a user reassigns their posts to the signed-in admin (the REST API's `reassign` parameter). Use HTTPS.

**Your data stays private.** This website does not store any data you enter in the live example - your WordPress URL, credentials, and any details you submit are kept in your browser and sent only to your own WordPress site.

User management headless demo[Open in new tab](/demo-apps/user-management/index.html)

<!-- -->

[ ](/demo-apps/user-management/index.html)

[User management headless demo](/demo-apps/user-management/index.html)

[ ](/demo-apps/user-management/index.html)

<!-- -->

[Download example](/demo-apps/user-management/index.html)
