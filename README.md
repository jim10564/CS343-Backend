# Manage Items Backend REST API Server

## 1. Meta Purpose

This project is an example of how to build a REST API server
using OpenAPI, ExpressJS + NodeJS, and Chai + Mocha, Docker + Docker Compose,
and GitLab + CI.

## 2. Purpose

Provide a REST API server for managing items.

## 3. Install development environment

To avoid dependency conflicts across projects, and to reduce variance
between development platforms, we use VS Code devcontainers.

New to VS Code devcontainers? Start here
https://code.visualstudio.com/docs/remote/containers 
and follow its installation instructions. Be sure to install and
configure Git too.

Now download, install, and run this project and its devcontainer as
follows.

1. Navigate to this project on GitLab and select
    `Clone -> Open in your IDE -> Visual Studio Code (HTTPS)`.
2. Select location to store the project.
3. Select "Reopen in container" when option is provided.

## 4. OpenAPI Specification of the API

`lib/items-api.yaml` contains the OpenAPI specification of the API it
implements. This file should not be modified directly. The specification
is maintained by a separate API project (which should be next to this
project in the repository hosting service (e.g., GitLab)).

## 5. If you want to use this code in production

1. Download, inspect, and configure `docs/docker-compose.yaml`.
2. Make database directory named `./backend-database/`.
   You can use a different name by configuring it in `docker-compose.yaml`.
    ```bash
    mkdir backend-database
    ```
2. Start the server.
    ```bash
    docker-compose up --detach
    ```
3. The service is now available at `http://localhost:10001/items`.
   You can configure the base url in `docker-compose.yaml`.
   See `lib/items-api.yaml` to learn what endpoints are available.
4. Stop the server.
    ```bash
    docker-compose down
    ```
5. To reset the database, delete the contents of `./backend-database`
    ```bash
    rm -rf ./backend-database
    ```

## 6. Environment Variables

* HOST_BASE_URL - Deprecated. Use BASE_URL.
* BASE_URL - The URL used to access the service from outside the Docker environment.
* MONGO_URI - The MongoDB connection string.

## 7. If you want to develop with this code

To run the system:

```bash
bin/down.sh
bin/up.sh
```

Build, run, and test.

```bash
bin/test.sh
```

The backend-server and its database will still be running. To shut them down...

```bash
bin/down.sh
```

There are several other scripts in `bin/` for common operations during
development. All of these are simple wrappers for `docker-compose` commands.
If you don't have Bash or would prefer to interact with `docker-compose`
directly, inspect these files.

### 7.2. Dependencies

Dependencies are managed in a few different files.

* Dockerfile - Base image for backend.
* src/package.json - 3rd party JavaScript libraries for backend.
* testing/test-runner/Dockerfile - Base image for test-runner.
* testing/test-runner/package.json - 3rd party JavaScript libraries for test-runner.

Use [yarn](https://yarnpkg.com/) to manage dependencies package.json. You can run yarn using the nodejs docker image.
