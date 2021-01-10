// This is the first file to load and run when the app is started.


// Although this is the top-level entrypoint,
// the first thing it does is load the configuration.
// Read that before continuing.
const config = require('./config');

// The logger allows us to report consistently JSON formatted log entries.
const logger = require('./logger');

// ExpressServer is responsible for building/configuring and running the server.
// You may want to finish reading this file before looking at it. But it is the
// next major chapter in our story.
const ExpressServer = require('./expressServer');

// Define an asynchronous function for launching the server.
const launchServer = async () => {
  try {
    // Instantiate the server. This performs initial configuration of the server.
    // All operations here are synchronous, so no need to await.
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    // Launch the server. This starts it up.
    this.expressServer.launch();
    // Note that the previous call is asynchronous. It will not end until the server halts.
    // But if we get here, we know that there were no immediate errors while starting
    // the server. So we log the status of the server, finish executing this function.
    logger.info('Express server running');
  } catch (error) {
    // If we are here, something went wrong with the configuration or initial start up
    // of the server. Log the failure.
    logger.error('Express Server failure', error.message);

    // Try to stop the server.
    await this.close();
    // TODO: I don't think this actually works. this does not refer to the server.
    // So I don't think you can call close on it.
  }
};
