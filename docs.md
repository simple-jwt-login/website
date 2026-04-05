# Introduction

**Simple-JWT-Login** is a free, open-source WordPress plugin that adds JSON Web Token (JWT) authentication to the WordPress REST API. It lets mobile apps, single-page applications, and external services securely interact with your WordPress site - without exposing admin credentials.

With Simple-JWT-Login you can:

* **Authenticate** users and receive a signed JWT
* **Auto-login** users via a tokenized link
* **Register** and **delete** users programmatically
* **Reset and change passwords** through the REST API
* **Protect any REST endpoint** so it requires a valid JWT
* **Refresh, validate, and revoke** tokens to manage session lifecycle

Whether you're building a headless WordPress site, a React/Vue front-end, a mobile app, or a third-party integration, Simple-JWT-Login provides a clean, standards-based authentication layer.

## Requirements[​](#requirements "Direct link to Requirements")

Before installing Simple-JWT-Login, ensure your environment meets the following minimum requirements:

* PHP **5.5** or higher
* WordPress **4.4.0** or higher

## License[​](#license "Direct link to License")

Simple-JWT-Login is open-source and distributed under the [GPL 3.0](https://github.com/nicumicle/simple-jwt-login/blob/master/LICENSE) License.

## Installation Guide[​](#installation-guide "Direct link to Installation Guide")

Setting up Simple-JWT-Login is quick and easy. Choose one of the following installation methods:

### Method 1: Install from WordPress.org (Recommended)[​](#method-1-install-from-wordpressorg-recommended "Direct link to Method 1: Install from WordPress.org (Recommended)")

* Go to the **Plugins** menu in WordPress and click "**Add New**".

  ![Add new plugin](/assets/images/add_plugin-a653dee0a50fb530f780a3cd6ea5da56.png "Add new plugin")

* Search for "**Simple JWT Login**" and select "**Install Now**".

  ![Search for Simple-JWT-Login plugin](/assets/images/search_simple-jwt-login-plugin-0d303b231fa3968b04c743d2be9467be.png "Search for simple-jwt-login")

* **Activate** the plugin when prompted.

  ![Activate the plugin](/assets/images/activate-simple-jwt-login-plugin-4cd33dab2931e22f8392b51ab9f6994e.png "Activate the plugin")

### Method 2: Download and Install Manually[​](#method-2-download-and-install-manually "Direct link to Method 2: Download and Install Manually")

* Access <https://wordpress.org/plugins/simple-jwt-login/>.

* Click "**Download**" to get the latest Simple-JWT-Login plugin version.

  ![Download the plugin](/assets/images/download_from_wordpress.org-504a3a552f242344362e06da1a7430a6.png "Download the plugin")

* Upload the `.zip` file via the WordPress plugin uploader (**Plugins → Add New → Upload Plugin**).

  ![Upload the plugin zip](/assets/images/upload_plugin_file_in_wordpress-64e263bcbabb002487ed7ac4f3ffb7c2.png "Upload plugin zip file")

* Click "**Install Now**" and **Activate** the plugin.

  ![Activate the plugin](/assets/images/activate-simple-jwt-login-plugin-4cd33dab2931e22f8392b51ab9f6994e.png "Activate the plugin")

Now that you've installed **Simple-JWT-Login**, check out the **Configuration Guide** to set up your JWT secret key and enable the features you need.
