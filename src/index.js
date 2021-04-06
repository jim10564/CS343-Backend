const bodyParser = require('body-parser');
const {SERVER_PORT, OPENAPI_FILE, ENDPOINTS_DIR} = require('./lib/config.js');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const http = require('http');
const logger = require('./lib/logger.js');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');

async function main() {
  let app = await buildApp();
  let server = http.createServer(app)
  server.listen(SERVER_PORT);
}

async function buildApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: OPENAPI_FILE,
      validateRequests: true,
      validateResponses: false,
    }),
  );

  mountEndpoints(app);

  app.use((err, req, res, next) => {
    logger.error(__filename, err);
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });
  return app;
}

function mountEndpoints(app) {
  let files = fs.readdirSync(ENDPOINTS_DIR);
  for (file of files) {
    let filePath = path.join(ENDPOINTS_DIR, file);
    const mount = require(filePath);
    mount(app);
  }
}

main();
