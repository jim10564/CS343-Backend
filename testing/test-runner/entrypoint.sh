# Create /openapi.test.yaml file that has a "servers:" section.
# Needed by api-contract-validator Chai plugin.
cp /openapi.yaml /openapi.test.yaml
echo "servers:" >> /openapi.test.yaml
echo "  - url: $SUT_BASE_URL" >> /openapi.test.yaml
node ./node_modules/mocha/bin/mocha -C
