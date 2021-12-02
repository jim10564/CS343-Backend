const Orders = require("../data/orders.js");

module.exports = {
  method: 'get',
  path: '/orders',
  async handler(request, response) {
    //This pulls the query of name variable from the http request
    let orders;
    orders = await Orders.getAll();
    response.status(200).json(orders);
  }
};