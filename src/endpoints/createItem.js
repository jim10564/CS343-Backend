const Items = require("../data/items.js");

module.exports = function (app) {
  app.post('/items', async function(request, response) {
    const itemData = request.body;
    const item = await Items.create(itemData);
    const resourceUri = `${request.originalUrl}/${item._id}`;
    response.status(201).location(resourceUri).json(item);
  });
}
