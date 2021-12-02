const Items = require("../data/items.js");

module.exports = {
  method: 'get',
  path: '/items',
  async handler(request, response) {
    let name = request.query.name;
    let items;
    if (name === undefined) {
       items = await Items.getAll();
    } else {
      items = await Items.getItemsByName(name); // add a call here to a new function to get the items by name
    }
    
    response.status(200).json(items);
  }
};
