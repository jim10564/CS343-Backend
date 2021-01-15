# org.librefoodpantry.bnm.inventory.items.backend

Provides a backend REST API server for managing items in a larger inventory system.

> IMPORTANT: This project is not intended for production environments.
> It was built as an educational exercise and is intended to serve as an educational
> example.

## Using this image

> ASPIRATIONAL: This section is aspirational. That means things probably don't work
> exactly as described. This section is intended to describe how we expect the image
> to be consumed once it is actually delivered to a container registry.

To run an instance, let's assume you have a MongoDB container named mongo-for-backend
running on network named network.mongo-for-backend. Let's also assume that the backend
image is in the container registry `registry.gitlab.com/librefoodpantry/training/spikeathons/winter-2021/stoney-manage-items/backend`.
Then the following command would deploy a backend container in your Docker environment
on the same network as the MongoDB container, and the service would be available outside
the docker environment on the host machine at <http://localhost:10001/v0>

```bash
docker run \
    --port="10001:3000" \
    -e HOST_BASE_URL=http://localhost:10001/v0 \
    -e MONGO_URI=mongodb://mongo-for-backend \
    --network=network.mongo-for-backend \
    registry.gitlab.com/librefoodpantry/training/spikeathons/winter-2021/stoney-manage-items/backend
```

Here is a docker-compose file that demonstrates the same.

```yaml
version: "3.8"
services:
  backend:
    image: http://container-registry.librefoodpantry.org/org.librefoodpantry.bnm.inventory.items.backend
    ports:
      - 10001:3000
    environment:
      HOST_BASE_URL: http://localhost:10001/v0
      MONGO_URI: mongodb://mongo-for-backend
    networks:
      - network.mongo-for-backend
    depends_on:
      - mongo-for-backend

  mongo-for-backend:
    image: mongo:4
    networks:
      - network.mongo-for-backend

networks:
  network.mongo-for-backend:
```

## Environment Variables

* HOST_BASE_URL - The URL used to access the service from outside the Docker environment.
* MONGO_URI - The MongoDB connection string.

## Developer Quick Start

> REAL: This section is real. Things should work. If not, let someone know.

Prerequisites

* Git
* Docker
* Bash (or a bash-like shell)

Use docker-compose and docker to build, run, and test the services in this project.

Here is a typical sequence to build, run, and test the backend (a.k.a. the service under test, or SUT).

```bash
docker-compose down --remove-orphans --volumes  # stop and remove anything from a previous run
docker-compose build                            # build all the images
docker-compose up --detach backend              # start backend and its dependencies
docker-compose run --rm test-runner             # run the tests
```

This sequence is so common that we put it into a bash script.

```bash
./dev test-sut
```

You can run any function as a subcommand of `./dev`. Do read `./dev` to learn
what else you can do with it.

Note that the SUT is still running. With it running, you can manually test it by
pointing your browser to <http://localhost:10001/api-docs/>.

To stop and remove the running containers...

```
./dev down
```

### Configuration and Dependencies

`docker-compose.yaml` contains the configuration for building docker images
and configuring containers to run together, including configuration of the
test environment.

`src/package.json` contains JavaScript dependencies used to implement the
backend REST API server. Use `docker-compose run --rm npm` (or `./dev npm`)
to manage them. For example,

```bash
cd src
../dev npm install     # Install into node_modules the depenencies listed in package.json
../dev npm outdated    # Check which packages are outdated and by how much
../dev npm update      # Update all packages to the most current version within the same major version.
../dev npm install somepackage@latest   # Upgrade somepackage to the most current major version.
```

`src/openapi.yaml` contains the OpenAPI specification of the REST API.
It contains metadata related to the API including a version number.

`src/config.js` contains configuration specific to the implementation of the backend.

`testing/test-runner/package.json` contains the dependencies for the test-runner. Again
use `./dev npm` to manage them.
