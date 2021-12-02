/**
 * orders.js is responsible for manipulating the orders collection in the
 * Mongo database. In architecture parlance, it is a Data Access Object.
 * It abstracts away the details of interact with the database.
 */
 const Database = require("../lib/database.js");
 const { ObjectID } = require("mongodb");
 
 
 class Orders {
   static async getAll() {
     const ordersCollection = await getOrdersCollection();
     const orders_cursor = ordersCollection.find();
     let orders = await orders_cursor.toArray();
     orders.forEach(order => {
       order._id = order._id.toHexString();
     });
     return orders;
   }
   
//    static async filter(details) {
//      const ordersCollection = await getordersCollection();
//      const orders_cursor = ordersCollection.find(details);
//      let orders = await orders_cursor.toArray();
//      orders.forEach(order => {
//        order._id = order._id.toHexString();
//      });
//      return orders;
//    }
 
//    static async getOne(id) {
//      const ordersCollection = await getordersCollection();
//      let order = await ordersCollection.findOne({ _id: ObjectID(id) });
//      if (order !== null) {
//        order._id = order._id.toHexString();
//      }
//      return order;
//    }
 
//    static async create(orderData) {
//      const ordersCollection = await getordersCollection();
//      const result = await ordersCollection.insertOne(orderData);
//      let order = await ordersCollection.findOne({ _id: result.insertedId });
//      order._id = order._id.toHexString();
//      return order;
//    }
 
//    static async update(orderData) {
//      const ordersCollection = await getordersCollection();
//      const result = await ordersCollection.updateOne(
//        { _id: ObjectID(orderData._id) },
//        { $set: { name: orderData.name } },
//        { upsert: false }
//      );
//      if (result.modifiedCount < 1) {
//        return null;
//      } else {
//        const order = await ordersCollection.findOne(
//          { _id: ObjectID(orderData._id) }
//        );
//        order._id = order._id.toHexString();
//        return orderData;
//      }
//    }
 
//    static async deleteOne(id) {
//      const ordersCollection = await getordersCollection();
//      const result = await ordersCollection.deleteOne(
//        { _id: ObjectID(id) }
//      );
//      return result.deletedCount >= 1;
//    }
 
}
    async function getOrdersCollection() {
     const database = await Database.get();
     return database.db("orders").collection("orders");
   }
 
 module.exports = Orders;
