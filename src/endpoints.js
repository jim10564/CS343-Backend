/**
 * endpoints.js is responsible for responding to requests for each endpoint
 * in the REST API.
 */

const logger = require("./logger");
const Items = require("./items");


class Endpoints {
  /**
   * POST /items
   *
   * Documented in openapi.yaml#/paths/~1items/post
   * Note: The ~1 in the previous line is the escape sequence for / in a
   * JSON pointer.
   *
   * See https://expressjs.com/en/4x/api.html for documentation on
   * the Request and Response objects passed.
   */
  static async createItem(request, response) {
    try {
      const itemData = request.body;
      const item = await Items.create(itemData);
      const resourceUri = `${request.originalUrl}/${item._id}`;
      response.status(201).location(resourceUri).json(item);
    } catch (e) {
      logger.error("Endpoints.createItem", e);
      response.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "See server's logs."
      });
    }
  }

  /**
   * GET /items
   *
   * Documented in openapi.yaml#/paths/~1items/get
   * Note: The ~1 in the previous line is the escape sequence for / in a
   * JSON pointer.
   *
   * See https://expressjs.com/en/4x/api.html for documentation on
   * the Request and Response objects passed.
   */
 static async listItems(request, response) {
    try {
      const items = await Items.getAll();
      response.status(200).json(items);
    } catch (e) {
      logger.error("Endpoints.listItem", e);
      response.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "See server's logs."
      });
    }
  }
}

module.exports = Endpoints;
