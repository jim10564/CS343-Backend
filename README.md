## Environment Variables

* HOST_BASE_URL - The URL used to access the service from outside the Docker environment.
* MONGO_URI - The MongoDB connection string.

## Developer Quickstart

Prerequisites

* Git
* Docker
* Bash (or a bashlike shell)

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
and configuring containers to run togther, including configuration of the
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
It contians metadata related to the API including a version number.

`src/config.js` contains configuration specific to the implemetnation of the backend.

`testing/test-runner/package.json` contains the dependencies for the test-runner. Again
use `./dev npm` to manage them.
