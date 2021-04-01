#!/usr/bin/env sh

# Inject BASE_URL into servers section of OpenApi specification.
if [ -n "${BASE_URL}" ] ; then
    echo "servers:" >> lib/items-api.yaml
    echo "  - url: '${BASE_URL}'" >> lib/items-api.yaml
fi

if [ -n "${1}" ] ; then
    "${@}"
else
    node src/core/index.js
fi
