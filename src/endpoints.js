const logger = require("./logger");
const Items = require("./items");


class Endpoints {

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
