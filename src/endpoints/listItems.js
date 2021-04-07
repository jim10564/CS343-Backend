const Items = require("../data/items.js");

module.exports = {
  method: 'get',
  path: '/items',
  async handler(request, response) {
    const items = await Items.getAll();
    response.status(200).json(items);
  }
};
