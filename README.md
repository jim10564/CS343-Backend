# Manage Items Backend REST API Server

> IMPORTANT: This project is not intended for production environments.
> It was built as an educational exercise and is intended to serve as an educational
> example.

Provides a backend REST API server for managing items in a larger inventory system.

src/openapi.yaml contains the specification for the Manage Items API.

## 1. Use via Docker

Make a directory to persist backend data.

```bash
mkdir data
```

Run a MongoDB instance.

```bash
docker run --name backend-database --detach -v "$PWD/data:/data/db" mongo:4
```

Run backend server.

```bash
docker run \
  --name backend \
  --detach \
  -p 10001:3000 \
  -e HOST_BASE_URL=http://localhost:10001/v0 \
  -e MONGO_URI=mongodb://backend-database \
  registry.gitlab.com/librefoodpantry/training/spikeathons/winter-2021/stoney-manage-items/backend:latest
```

Now the API documentation is available at http://localhost:10001/api-docs and the service is available at http://localhost:10001/v0/items .

## 2. Use via Docker Compose

Create the following docker-compose.yaml file.

```yaml
version: "3.8"
services:

  backend:
    image: registry.gitlab.com/librefoodpantry/training/spikeathons/winter-2021/stoney-manage-items/backend:latest
    ports:
      - 10001:3000
    environment:
      HOST_BASE_URL: http://localhost:10001/v0
      MONGO_URI: mongodb://backend-database
    networks:
      - backend-network
    depends_on:
      - backend-database

  backend-database:
    image: mongo:4
    networks:
      - backend-network
    volumes:
      # Persistence
      - type: bind
        source: ./data/backend-database
        target: /data/db

networks:
  backend-network:
```

Make the directory where the backend database will persist its data.

```bash
mkdir -p data/backend-database
```

Start.

```bash
docker-compose up --detach
```

Stop.

```bash
docker-compose down
```

## 3. Environment Variables

* HOST_BASE_URL - The URL used to access the service from outside the Docker environment.
* MONGO_URI - The MongoDB connection string.

## 4. Development

Build.

```bash
docker-compose build
```

Run.

```bash
docker-compose up --detach backend
```

The service is available at http://localhost:10001/v0/items .

Test.

```bash
docker-compose run --rm test-runner
```

Stop.

```bash
docker-compose down
```

### 4.1. Dependencies

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

### 4.2. Configuration

* `docker-compose.yaml` - Configures the test/development environment.
* `src/openapi.yaml` - Contains the OpenAPI specification of the REST API. It contains metadata related to the API including a version number.
* `src/config.js` - Contains configuration specific to the implementation of the backend.
