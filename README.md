# Manage Items Backend REST API Server

## 1. Meta Purpose

This project is an example of how to build a REST API server
using OpenAPI, ExpressJS + NodeJS, and Chai + Mocha, Docker + Docker Compose,
and GitLab + CI.

## 2. Purpose

Provide a REST API server for managing items.

## 3. OpenAPI Specification of the API

`lib/items-api.yaml` contains the OpenAPI specification of the API it
implements. This file should not be modified directly. The specification
is maintained by a separate API project (which should be next to this
project in the repository hosting service (e.g., GitLab)).

## 4. Use

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
3. The service is now available at `http://localhost:10001/v0/items`.
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

## 5. Environment Variables

* HOST_BASE_URL - Deprecated. Use BASE_URL.
* BASE_URL - The URL used to access the service from outside the Docker environment.
* MONGO_URI - The MongoDB connection string.

## 6. Development

Build, run, and test.

```bash
bin/test
```

The backend-server and its database will still be running. To shut them down...

```bash
bin/down
```

There are several other scripts in `bin/` for common operations during
development. All of these are simple wrappers for `docker-compose` commands.
If you don't have Bash or would prefer to interact with `docker-compose`
directly, inspect these files.

### 6.2. Dependencies

Dependencies are managed in a few different files.

* Dockerfile - Base image for backend.
* src/package.json - 3rd party JavaScript libraries for backend.
* testing/test-runner/Dockerfile - Base image for test-runner.
* testing/test-runner/package.json - 3rd party JavaScript libraries for test-runner.

Use [yarn](https://yarnpkg.com/) to manage dependencies package.json. You can run yarn using the nodejs docker image.

```bash
docker run -it --rm -v "$PWD:/w" -w /w node:14-alpine yarn
```

For example, to check if there are any outdated packages in test-runner...

```bash
cd testing/test-runner
docker run -it --rm -v "$PWD:/w" -w /w node:14-alpine yarn outdated
```
