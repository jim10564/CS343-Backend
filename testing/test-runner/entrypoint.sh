#!/usr/bin/env sh

cp -R /app/items-api /tmp/items-api
echo "- url: $SUT_BASE_URL" > /tmp/items-api/src/servers/index.yaml
/app/node_modules/.bin/swagger-cli bundle /tmp/items-api/src/index.yaml --outfile /tmp/items-api.yaml --type yaml

node ./node_modules/mocha/bin/mocha -C
