## Environment Variables

* MONGO_URI - The MongoDB connection string.
* URL_PROTOCOL
* URL_SERVER
* URL_PORT
* URL_PATH

## Developer Quickstart

Prerequisites

* Bash
* Docker

Configuration

* `./project.env`
* `./src/package.json`

Build tools

* `./project` - Each function in this script is a subcommand. For example `./project build` runs `function build`.
    Read this file to learn about commands and what they do.

### Editing the OpenApi Specification

#### Install

* Insomnia-Designer

#### Import the project

1. In GitLab, generate an access token for insomnia that has read and write privileges for your repositories. Copy the token.
2. In Insomnia-Designer, click `Documnets` (upper left), click `Create` (upper right), click `Git Clone`, fill out the form, and click `Done`.

This creates a local repository managed by Insomnia-Designer.
Whenever you make a change,
  you will need to commit it (upper right corner),
  and then push it (upper right corner).
Then go back to your local clone of the project, and pull the changes.
Then run `project build`. This will export the spec to openapi.yaml
  and regenerate the src folder
  and the spec in src/api/openapi.yaml.
