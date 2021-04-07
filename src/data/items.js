/**
 * items.js is responsible for manipulating the items collection in the
 * Mongo database. In architecture parlance, it is a Data Access Object.
 * It abstracts away the details of interact with the database.
 */
const Database = require("../lib/database.js");
const { ObjectID } = require("mongodb");


class Items {
  static async getAll() {
    const itemsCollection = await getItemsCollection();
    const items_cursor = itemsCollection.find();
    let items = await items_cursor.toArray();
    items.forEach(item => {
      item._id = item._id.toHexString();
    });
    return items;
  }

  static async getOne(id) {
    const itemsCollection = await getItemsCollection();
    let item = await itemsCollection.findOne({ _id: ObjectID(id) });
    if (item !== null) {
      item._id = item._id.toHexString();
    }
    return item;
  }

  static async create(itemData) {
    const itemsCollection = await getItemsCollection();
    const result = await itemsCollection.insertOne(itemData);
    let item = await itemsCollection.findOne({ _id: result.insertedId });
    item._id = item._id.toHexString();
    return item;
  }

  static async update(itemData) {
    const itemsCollection = await getItemsCollection();
    const result = await itemsCollection.updateOne(
      { _id: ObjectID(itemData._id) },
      { $set: { name: itemData.name } },
      { upsert: false }
    );
    if (result.modifiedCount < 1) {
      return null;
    } else {
      const item = await itemsCollection.findOne(
        { _id: ObjectID(itemData._id) }
      );
      item._id = item._id.toHexString();
      return itemData;
    }
  }

  static async deleteOne(id) {
    const itemsCollection = await getItemsCollection();
    const result = await itemsCollection.deleteOne(
      { _id: ObjectID(id) }
    );
    return result.deletedCount >= 1;
  }
}

async function getItemsCollection() {
  const database = await Database.get();
  return database.db("items").collection("items");
}

module.exports = Items;
