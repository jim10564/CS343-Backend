const Orders = require("../data/orders.js");

module.exports = {
  method: 'get',
  path: '/orders',
  async handler(request, response) {
    //This pulls the query of email variable from the http request
    console.log("get all orders test");
    let email = request.query.email;
    let orders;
    if(email === undefined){
      orders= await Orders.getAll() 
    }
    else{
      orders = await Orders.getOrdersByEmail(email)
      }
    response.status(200).json(orders);
  }
};

// module.exports = {
//   method: 'get',
//   path: '/orders',
//   async handler(request, response) {
//     //This pulls the query of email variable from the http request
//     let orders;  
//     orders = await Orders.getAll();
//     response.status(200).json(orders);
//   }
// };
