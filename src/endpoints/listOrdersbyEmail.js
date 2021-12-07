const Orders = require("../data/orders.js");

module.exports = {
  method: 'get',
  path: '/orders?email={email}',
  async handler(request, response) {
    //This pulls the query of email variable from the http request
    console.log("get by email test");
    let email = request.query.email;
    //let email = request.

    let orders;
    orders = await Orders.getOrdersByEmail(email)
    response.status(200).json(orders);
  }
};
