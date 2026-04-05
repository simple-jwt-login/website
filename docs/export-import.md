# Simple-JWT-Login Export-Import Add-on

The Export-Import add-on lets you copy your Simple-JWT-Login configuration - including Auth Codes, protection rules, and all general settings - from one WordPress site to another in just a few steps. This is especially useful when setting up staging environments, migrating sites, or replicating a configuration across a network of sites.

[Download](https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip)

## Installation[​](#installation "Direct link to Installation")

1. Download the add-on from <https://github.com/simple-jwt-login/export-import/>
2. Upload the zip file into your WordPress
3. Activate the plugin
4. Export or import data

## Screenshots[​](#screenshots "Direct link to Screenshots")

### Configuration[​](#configuration "Direct link to Configuration")

![](https://github.com/simple-jwt-login/export-import/raw/master/wordpress.org/screenshot-1.png?raw=true)

## How to transfer settings[​](#how-to-transfer-settings "Direct link to How to transfer settings")

**On the source site:**

1. Go to the Simple-JWT-Login settings page.
2. Click **Export** to generate a configuration snapshot.
3. Copy the generated code.

**On the destination site:**

1. Install and activate both Simple-JWT-Login and the Export-Import add-on.
2. Go to the Simple-JWT-Login settings page.
3. Paste the copied code into the import field.
4. Click **Import** and confirm the prompt.

The destination site will now have the same configuration as the source.
