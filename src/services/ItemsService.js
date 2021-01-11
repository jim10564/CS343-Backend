/* eslint-disable no-unused-vars */
const ItemsAccessObject = require("../access-objects/ItemsAccessObject");

async function createItem({ itemData }) {
  const item = await ItemsAccessObject.create(itemData);
  return item;
}

async function listItems() {
  return await ItemsAccessObject.getAll();
}

module.exports = {
  listItems,
  createItem
};
