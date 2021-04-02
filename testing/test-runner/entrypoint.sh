#!/usr/bin/env sh

cp -R /app/lib/items-api.yaml /tmp/items-api.yaml
echo "servers:" >> /tmp/items-api.yaml
echo "  - url: '${SUT_BASE_URL}'" >> /tmp/items-api.yaml

node ./node_modules/mocha/bin/mocha -C
