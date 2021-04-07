const Items = require("../data/items.js");

module.exports = {
  method: 'post',
  path: '/items',
  async handler(request, response) {
    const itemData = request.body;
    const item = await Items.create(itemData);
    const resourceUri = `${request.originalUrl}/${item._id}`;
    response.status(201).location(resourceUri).json(item);
  }
};
