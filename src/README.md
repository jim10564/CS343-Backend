
## Create skeleton for new endpoint

1. Define the endpoint in openapi.yml and set the following (see OpenAPI documentation [1]).
  a. `x-eov-operation-handler: endpoints`
  b. `operationId: foo` where foo is the name of the static method in Endpoints.
2. Add a new static method to Endpoints (in endpoints.js) named `foo`.

## Implementing the new endpoint

1. Use `request` to extract parameters. See Express documentation [2].
2. Implement business logic.
3. Use `response` to construct and send response. See Express documentation [2].
4. Use `logger` and `response` in catch to log and send error messages.
   See Winston documentation for logger [3].

Whenever possible, keep the logic in your handler as simple as possible.
It should be a coordinator, calling other functions to perform the dirty work.
Don't hesitate to create other JavaScript files to hold helper functions and
import them into endpoints.js.

## References
- [1] OpenAPI Schema documentation
- [2] Express documentation
- [3] Winston documentation
