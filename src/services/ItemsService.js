/* eslint-disable no-unused-vars */
const logger = require("../logger");
const config = require("../config");
const Service = require('./Service');
const ItemsAccessObject = require("../access-objects/ItemsAccessObject");

/**
*
* itemData ItemData
* no response value expected for this operation
* */
async function createItem({ itemData }) {
  try {
    const item = await ItemsAccessObject.create(itemData);
    const payload = {
      location: `${config.FULL_PATH}/items/${item._id}`,
      payload: item
    };
    const code = 201;
    return Service.successResponse(payload, code);
  } catch (e) {
    throw Service.rejectResponse(
      e.message || 'Invalid input',
      e.status || 405,
    );
  }
}

/**
*
* returns inline_response_200
* */
async function listItems() {
  try {
    const items = await ItemsAccessObject.getAll();
    return Service.successResponse(items);
  } catch (e) {
    logger.warn(e);
    throw Service.rejectResponse(
      e.message || 'Invalid Input',
      e.status || 400,
    );
  }
}


module.exports = {
  listItems,
  createItem
};
