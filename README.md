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

Open a Bash shell and change into the root this project

```bash
cd /path/to/backend
```

Bash functions for developers are in dev-bash-functions.
View dev-bash-functions to see what functions are available and what they do.

```bash
less dev-bash-functions
```

Source dev-bash-functions to load the functions into your current bash environment.

```bash
source dev-bash-functions
```

Only run development functions from the root of the project.

Here are a couple to get your started. Build and start the system.

```bash
up
```

Start a browser and point it to http://localhost:8080/api-docs .

View the logs.

```bash
logs
```

Stop the system.

```bash
down
```
