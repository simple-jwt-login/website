# Simple JWT Login Documentation

[![CI-validate](https://github.com/simple-jwt-login/website/actions/workflows/ci.yaml/badge.svg)](https://github.com/simple-jwt-login/website/actions/workflows/ci.yaml)
[![CI-deploy](https://github.com/simple-jwt-login/website/actions/workflows/deploy.yaml/badge.svg)](https://github.com/simple-jwt-login/website/actions/workflows/deploy.yaml)
[![pages-build-deployment](https://github.com/simple-jwt-login/website/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/simple-jwt-login/website/actions/workflows/pages/pages-build-deployment)

This is the official documentation repository for the [Simple JWT Login](https://github.com/nicumicle/simple-jwt-login) WordPress plugin! 

This project uses [Docusaurus](https://docusaurus.io/) to provide a structured and easy-to-navigate documentation site.

## About Simple JWT Login

**Simple JWT Login** is a WordPress plugin designed to allow easy authentication via JSON Web Tokens (JWT). This plugin provides a secure way to manage API access by generating and verifying tokens, making it ideal for custom WordPress API integrations and user authentication.

## Getting Started

This repository includes everything needed to contribute to or run the documentation locally. Please follow the steps below to set up the project.

### Prerequisites
- [docker](https://docs.docker.com/get-started/get-docker/)
- [docker-compose](https://docs.docker.com/compose/)

### Running the Project Locally

```bash
docker-compose up
```

Access the website at [http://localhost:3002](http://localhost:3002)


## Project Structure
The project is structured as follows:

- **/docs**: Contains markdown files for the main documentation content.
- **/blog**: Stores any blog content for the documentation site.
- **/releases**: Stores any releases content for the documentation site.
- **/src**: Holds custom components and styling files.
- **docusaurus.config.js**: Main configuration file for the Docusaurus site.
- **sidebars.js**: Defines the structure and sidebar items for the documentation.


## Deployment

Pushing a tag deploys production (`.github/workflows/deploy.yaml`). These settings (Settings, Secrets and variables, Actions) control the hosting:

| Name | Kind | Value |
|---|---|---|
| `DEPLOY_TARGET` | Variable | `cloudflare` deploys production to Cloudflare Workers. Anything else, or unset, deploys to GitHub Pages |
| `PREVIEWS_ENABLED` | Variable | `true` allows pull request previews. Anything else, or unset, turns them off. Existing previews are still cleaned up |
| `CLOUDFLARE_ACCOUNT_ID` | Variable | Cloudflare account ID. Cleanup is off while it is unset |
| `CLOUDFLARE_API_TOKEN` | Secret | API token with the "Edit Cloudflare Workers" permissions |

Before switching production, deploy once and add `simplejwtlogin.com` under the Worker's Settings, Domains & Routes.

### Pull request previews

- **Start:** Actions, CI-preview, Run workflow, then enter the pull request number. Only people with write access can do this. Review the changes first, then run it again after new commits.
- **Link:** posted as a comment on the pull request.
- **Stop:** deleted when the pull request is merged or closed, or 2 days after the last deploy (checked hourly).

## Contributing
We welcome contributions to improve and expand the documentation! Here’s how you can get involved:

1. Fork the repository.
2. Create a branch for your feature or fix.
3. Commit your changes with a clear message.
4. Push your branch and create a Pull Request.

:tip Please ensure your changes follow the structure and style guidelines of the existing documentation.


## License
This project is licensed under the [MIT License](https://github.com/simple-jwt-login/website/blob/main/LICENSE).