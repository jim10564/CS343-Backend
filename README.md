## Environment Variables

* MONGO_URI - The MongoDB connection string.
* URL_PROTOCOL
* URL_SERVER
* URL_PORT
* URL_PATH

## Developer Quickstart

### Prerequisites

* Bash
* Docker

### Configuration

* `/project.env`
* `/src/package.json`

### Scripts

`/project` contains a number of bash functions that are useful during development.
Each function can be executed as a subcommand of `/project`. For example,
if there is a function named `build`, then you can execute it like `./project build`.

### Build

```
./project build
```

### Manual testing

Build as described above.

Run the server:

```
./project start
```

Open browser to `http://localhost:10001/api-docs` to view interactive documentation.

View logs:

```
./project logs
```

Stop the server:

```
./project stop
```

### OpenApi and Insomnia

We use OpenApi to specify our REST API.
The official source of the specification is stored in `/.insomnia`.
Only use Insomnia-Designer to edit these files.
The build scripts (`./project build`) use Insomnia Inso to export
the specification to `/openapi.yaml` and openapi-generator-cli to generate
files in `/src/` including `/src/api/openapi.yaml` (which is not exactly the
same as `/openapi.yaml`).

If you want to make small changes that you don't intend to commit,
you can edit `/openapi.yaml` directly, and then build the project.

If you want to make a more permanent change, use Insomnia-Designer.
Install Insomnia-Designer and then use it to clone the project
using an access token that you get from GitLab. Then use it to edit
the specification, commit the change, and push it to GitLab.
Notice that Insomnia-Desigener keeps a separate local repository
of the repository. So after you make, commit, and push your changes
using Insomnia-Designer, you'll need to pull those changes into your
local clone. Also note that Insomnia-Desinger knows how to create
and use Git branches. One last note, Insomnia-Designer does NOT know
how to deal with merge conflicts; so avoid them like the plague.

We also use Insomnia-Designer to design unit tests for the API.
These can be ran from either within Insomnia-Designer or from
the command-line using Inso (e.g., `./project inso run test`).
