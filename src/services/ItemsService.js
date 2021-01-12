/* eslint-disable no-unused-vars */
const ItemsAccessObject = require("../access-objects/ItemsAccessObject");
const logger = require("../logger");

async function getItem({ _id }) {
  logger.info(`getItem({ ${_id} })`);
  const item = await ItemsAccessObject.getOne(_id);
  if (item === null) {
    throw {
      status: 404,
      message: `No item has an _id=${_id}`
    }
  }
  return item;
}

async function createItem({ itemData }) {
  const item = await ItemsAccessObject.create(itemData);
  return item;
}

async function listItems() {
  return await ItemsAccessObject.getAll();
}

module.exports = {
  listItems,
  createItem,
  getItem
};
