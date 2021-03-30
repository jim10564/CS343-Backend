const logger = require("../core/logger.js");

function endpoint(controller) {
  return async (request, response) => {
    try {
      await controller(request, response);
    } catch (e) {
      logger.error(e);
      response.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "See server's logs."
      });
    }
  }
};

module.exports = endpoint;
