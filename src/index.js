/**
 * index.js is the entrypoint. It creates and starts the server.
 */

// Load builtin libraries.
const http = require('http');
const path = require('path');

// Load 3rd-party libraries.
const express = require('express');
const cors = require('cors');
const OpenApiValidator = require('express-openapi-validator');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');

// Load our libraries.
const config = require('./config');
const logger = require('./logger');

// Create express app.
const app = express();

// Enable CORS Requests for ALL requests.
app.use(cors());

// Set up body parsers for the request body types you expect.
// Must be specified prior to endpoints.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Install the OpenApiValidator onto your express app.
// See https://github.com/cdimascio/express-openapi-validator#%EF%B8%8F-operationhandlers-optional
// for configuration.
app.use(
  OpenApiValidator.middleware({

    // The spec that will be used to validate against and to route requests.
    apiSpec: config.OPENAPI_SCHEMA,

    // Validate requests.
    validateRequests: true,

    // Validate responses.
    // If we validate responses, and a response is invalid, then the client
    // receives an error message that obscures the orignal (although invalid)
    // response. This makes debugging the response more difficult. Instead,
    // validate responses in tests ran as a client.
    validateResponses: false,

    // Use x-eov-* and operationId in openapi.yaml to define routes.
    // They are relative to this dierectory.
    operationHandlers: path.join(__dirname),
  }),
);

// Serve interactive documentation.
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(config.OPENAPI_SCHEMA));

// Create an Express error handler
app.use((err, req, res, next) => {
  // Dump errors to server logs (console).
  logger.error(__filename, err);

  // Send error response to client.
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

// Start serving.
http.createServer(app).listen(3000);
