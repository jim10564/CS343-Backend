const Items = require("../../items.js");
const endpoint = require("../../core/endpoint.js");

const viewItem = endpoint(async (request, response) => {
  const id = request.params.id;
  const item = await Items.getOne(id);
  if (item !== null) {
    response.status(200).json(item);
  } else {
    response.status(404).json({
      status: 404,
      error: "Item not found",
      message: "ID does not exist"
    })
  }
});

module.exports = { viewItem }
