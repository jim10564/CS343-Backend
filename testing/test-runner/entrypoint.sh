#!/usr/bin/env sh

cp -R /app/lib/items-api.yaml /tmp/items-api.yaml
echo "servers:" >> lib/items-api.yaml
echo "  - url: '${BASE_URL}'" >> lib/items-api.yaml

node ./node_modules/mocha/bin/mocha -C
