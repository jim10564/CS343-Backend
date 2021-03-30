const Items = require("../../items.js");
const endpoint = require("../../core/endpoint.js");

const listItems = endpoint(async (request, response) => {
  const items = await Items.getAll();
  response.status(200).json(items);
});

module.exports = { listItems }
