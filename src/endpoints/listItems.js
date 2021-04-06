const Items = require("../data/items.js");

module.exports = function (app) {
  app.get('/items', async function(request, response) {
    const items = await Items.getAll();
    response.status(200).json(items);
  });
}
