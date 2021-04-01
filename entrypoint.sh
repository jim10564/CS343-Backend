#!/usr/bin/env sh

# Inject BASE_URL into servers section of OpenApi specification.
if [ -n "${BASE_URL}" ] ; then
    echo "- url: ${BASE_URL}" > lib/items-api/src/servers/index.yaml
fi

if [ -n "${1}" ] ; then
    "${@}"
else
    node src/core/index.js
fi
