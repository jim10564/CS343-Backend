const Items = require("../../items.js");
const endpoint = require("../../core/endpoint.js");

const createItem = endpoint(async (request, response) => {
    const itemData = request.body;
    const item = await Items.create(itemData);
    const resourceUri = `${request.originalUrl}/${item._id}`;
    response.status(201).location(resourceUri).json(item);
  });


module.exports = { createItem }
