const Items = require("../data/items.js");

module.exports = {
  method: 'put',
  path: '/items/:id',
  async handler(request, response) {
    let id = request.params.id;
    let data = request.body;
    data._id = id;
    let item = await Items.update(data);
    if (item !== null) {
      response.status(200).json(item);
    } else {
      response.status(404).json({
        status: 404,
        error: "Item not found",
        message: "ID does not exist"
      })
    }
  }
};
