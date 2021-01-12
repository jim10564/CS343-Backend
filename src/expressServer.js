// const { Middleware } = require('swagger-express-middleware');
const http = require('http');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator');
const logger = require('./logger');

class ExpressServer {
  constructor(port, openApiSchema) {
    this.port = port;
    this.app = express();
    this.schema = openApiSchema;
    this.setupMiddleware();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '14MB' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    //View the openapi document in a visual interface. Should be able to test from this page
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));
    this.app.get('/login-redirect', (req, res) => {
      res.status(200);
      res.json(req.query);
    });
    this.app.get('/oauth2-redirect.html', (req, res) => {
      res.status(200);
      res.json(req.query);
    });
  }

  launch() {
    new OpenApiValidator({
      apiSpec: this.schema,
      operationHandlers: __dirname,
      validateResponses: false,
      validateRequests: false,
    }).install(this.app)
      .catch(e => console.log(e))
      .then(() => {
        // eslint-disable-next-line no-unused-vars
        this.app.use((err, req, res, next) => {
          // format errors
          res.status(err.status || 500).json({
            message: err.message || err,
            errors: err.errors || '',
          });
        });
        http.createServer(this.app).listen(this.port);
        logger.info(`Listening on port ${this.port} within container.`);
      });
  }


  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      logger.info(`Server on port ${this.port} has shut down.`);
    }
  }
}

module.exports = ExpressServer;
