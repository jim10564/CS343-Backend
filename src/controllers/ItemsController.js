const Controller = require('./Controller');
const service = require('../services/ItemsService');

async function createItem(request, response) {
  try {
    const item = await Controller.handleRequest(request, response, service.createItem);
    response
      .status(201)
      .location(`${request.originalUrl}/${item._id}`)
      .json(item);
    } catch (e) {
      response.status(e.status).json(e);
    }
  };

const getItem = async (request, response) => {
  await Controller.handleRequest(request, response, service.getItem);
};

async function listItems(request, response) {
  try {
    const items = await Controller.handleRequest(request, response, service.listItems);
    response.status(200).json(items);
  } catch (e) {
    response.status(e.status).json(e);
  }
};

module.exports = {
  createItem,
  getItem,
  listItems,
};
