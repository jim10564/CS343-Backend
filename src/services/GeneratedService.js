/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
*
* itemData ItemData 
* returns Item
* */
const createItem = ({ itemData }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        itemData,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
*
* returns inline_response_200
* */
const listItems = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createItem,
  listItems,
};
