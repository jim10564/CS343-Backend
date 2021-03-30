# Create /openapi.test.yaml file that has a "servers:" section.
# Needed by api-contract-validator Chai plugin.
# cp /openapi.yaml /openapi.test.yaml
# echo "servers:" >> /openapi.test.yaml
# echo "  - url: $SUT_BASE_URL" >> /openapi.test.yaml


cp -R /sut /sut-test
echo "servers:" >> /sut-test/openapi.yaml
echo "  - url: $SUT_BASE_URL" >> /sut-test/openapi.yaml
/app/node_modules/.bin/swagger-cli bundle /sut-test/openapi.yaml --outfile /openapi.test.yaml --type yaml

node ./node_modules/mocha/bin/mocha -C
