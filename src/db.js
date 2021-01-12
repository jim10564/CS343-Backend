const config = require("./config");
const logger = require("./logger");
const { MongoClient, ObjectID } = require("mongodb");

class Items {
  static async getAll() {
    try {
      const mongoClient = new MongoClient(config.MONGO_URI, { useUnifiedTopology: true });
      await mongoClient.connect();
      const items_cursor = await mongoClient.db("items").collection("items").find();
      let items = await items_cursor.toArray();
      items.forEach(item => {
        item._id = item._id.toHexString();
      });
      return items;
    } catch (e) {
      logger.error("ItemsAccessObject.getAll", e);
      throw new {
        code: 500,
        error: "Internal Server Error",
        caused_by: e
      };
    }
  }

  static async create(itemData) {
    try {
      const mongoClient = new MongoClient(config.MONGO_URI, { useUnifiedTopology: true });
      await mongoClient.connect();
      const collection = mongoClient.db("items").collection("items");
      const result = await collection.insertOne(itemData);
      let item = await collection.findOne({_id: result.insertedId});
      item._id = item._id.toHexString();
      return item;
    } catch (e) {
      logger.error("ItemsAccessObject.create", e);
      throw new {
        code: 500,
        error: "Internal Server Error",
        caused_by: e
      };
    }
  }
}

module.exports = {Items};
