const Orders = require("../data/orders.js");

module.exports = {
  method: 'post',
  path: '/orders',
  async handler(request, response) {
    const orderData = request.body;
    const order = await Orders.create(orderData);
    const resourceUri = `${request.originalUrl}/${order._id}`;
    response.status(201).location(resourceUri).json(order);
  }
};
