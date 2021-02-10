const MongoClient = require("mongodb").MongoClient;

const config = require("./config");


class Database {
  static #singleton;

  // Return a connected database MongoClient.
  static async get() {
    if (Database.#singleton === undefined) {
      Database.#singleton =
          new MongoClient(config.MONGO_URI, { useUnifiedTopology: true });
      await Database.#singleton.connect();
    }
    return Database.#singleton;
  }
}


module.exports = Database;
