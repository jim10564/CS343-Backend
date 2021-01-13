## Environment Variables

* MONGO_URI - The MongoDB connection string.
* HOST_BASE_URL - The URL used to access the service from outside the Docker environment.
* SERVER_PORT - The port the server listens on within the Docker container.

## Developer Quickstart

Requires

* Bash (or some approximation of a linux style shell)
* Docker installed and running

Clone this project, and position a command prompt in the root of this project.

`dev` is a bash script that contains a number of bash functions to manage/automate
parts of the development process. Each function can be executed as a subcommand
`/dev`. For example, if there is a function named `build`, then you can execute it
like `./dev build`.

Setup the development/testing environment.

```
./dev setup
```

Build, start, and test the backend in the testing environment.

```
./dev cycle
```

Rerun the last command after every change you make to rebuild, restart,
and retest the backend.

You can view the logs of the servers in the testing environment as follows.

```
./dev logs
```

You can interact with and manually test the system running in the testing
environment by opening a browser to <http://localhost:10001/v0/api-docs/>.

You can rerun the automated tests only as follows.

```
./dev run-tests
```

You might want to rerun just the tests if tests are the only thing you
have changed since your last `./dev cycle`.  That way you don't have to
rebuild and rerun everything.

When you are done and want to turn things off.

```
./dev teardown
```

This will stop all containers running in the testing environment. Images
will remain.

### Configuration and Dependencies

`dev.env` contains a number environment variables that allow you to configure
how `dev` behaves. These variables include version numbers of some of the
dependencies used by the product, the build system, and the testing environment.

`src/package.json` contains JavaScript dependencies used to implement the
backend REST API server. Use the `npm` function in `dev` to manage them.

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
