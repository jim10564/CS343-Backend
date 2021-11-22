const Orders = require("../data/orders.js");

module.exports = {
  method: 'get',
  path: '/orders',
  async handler(request, response) {
    let name = request.query.name;
    let orders;
    if (name === undefined) {
       orders = await Orders.getAll();
    } else {
      orders = await Orders.getOrderByName(name); // add a call here to a new function to get the items by name
    }
    
    response.status(200).json(orders);
  }
};
