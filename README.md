# Manage Items Backend REST API Server

> IMPORTANT: This project is not intended for production environments.
> It was built as an educational exercise and is intended to serve as an educational
> example.

Provides a backend REST API server for managing items in a larger inventory system.

src/openapi.yaml contains the specification for the Manage Items API.

## 1. Use

Download and inspect/configure `docker-compose.yaml`.

Make database directory. By default `./backend-database`.

```bash
mkdir backend-database
```

Start.

```bash
docker-compose up --detach
```

By default the service is now available at `http://localhost:10001/v0/items`


See src/openapi.yaml to learn what endpoints are available.

Stop.

```bash
docker-compose down
```

To reset the database, delete the contents of `./backend-database`

```bash
rm -rf ./backend-database
```

## 4. Environment Variables

* HOST_BASE_URL - The URL used to access the service from outside the Docker environment.
* MONGO_URI - The MongoDB connection string.

## 5. Development

Build the backend-server.

```bash
# ci/build
docker-compose -f docker-compose.yaml -f docker-compose.build.yaml build --pull backend-server
```

Build the test-runner.

```bash
# ci/build-test
docker-compose -f docker-compose.dev.yaml build --pull test-runner
```

Run the backend-server and its database.

```bash
# ci/up
docker-compose -f docker-compose.dev.yaml up --detach backend-server
```

Test the running backend-server.

```bash
# ci/test
docker-compose -f docker-compose.dev.yaml run --rm test-runner
```

Stop the backend-server and its database.

```bash
# ci/down
docker-compose -f docker-compose.dev.yaml down
```

### 5.1. Dependencies

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

### 5.2. Configuration

* `docker-compose.yaml` - Configures the test/development environment.
* `src/openapi.yaml` - Contains the OpenAPI specification of the REST API. It contains metadata related to the API including a version number.
* `src/config.js` - Contains configuration specific to the implementation of the backend.
