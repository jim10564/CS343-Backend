

// CONTROLLER - manipulates requests and responses

class ItemsController {
  async listItems(request, response) {
    try {
      const model = request.ioc.get("ItemsModel");
      const listItems = request.ioc.get("ItemsService.listItems");
      const items = await listItems(model);
      response.status = 200;
      response.json(items);
    } catch (e) {
      response.status = 500;
      response.end();
      logger.error(e);
    }
  }

  async getItem(request, response) {
    try {
      const model = request.ioc.get("ItemsModel");
      const getItem = request.ioc.get("ItemsService.getItem");
      const id = extractFromQueryString(request, "id");
      const item = await getItem(model, id);
      response.status = 200;
      response.json(item);
    } catch (e) {
      response.status = 500;
      response.end();
      logger.error(e);
    }
  }

  async createItem(request, response) {
    try {
      const model = request.ioc.get("ItemsModel");
      const createItem = request.ioc.get("ItemsService.createItem");
      const name = extractFromBody(request, "name");
      const item = await createItem(model, name);
      response.location = request.path + "/" + item._id;
      response.status = 201;
      response.json(item);
    } catch (e) {
      response.status = 500;
      response.end();
      logger.error(e);
    }
  }
}

// SERVICE - implements endpoint

async function listItems(itemsModel) {
  const items = await itemsModel.getAll();
  return items;
}

async function createItem(itemsModel, itemData) {
  const id = await itemsModel.create(itemData);
  const item = await itemsModel.getById(id);
  return item;
}

async function getItem(itemsModel, id) {
  const item = await itemsModel.getById(id);
  return item;
}

// MODEL - manipulate database

class ItemsModel {
  static async create(itemData) {
    const collection = await this.connectToItemsCollection();
    const result = await collection.insertOne(itemData);
    const id = result.insertedId.toHexString();
    return id;
  }

  static async getById(id) {
    const collection = await this.connectToItemsCollection();
    const item = await collection.findOne({_id: ObjectID(id)});
    item._id = item._id.toHexString()
    return item;
  }

  static async getAll() {
    collection = await this.connectToItemsCollection();
    cursor = await collection.find();
    items = cursor.toArray();
    for (item of items)
      item._id = item._id.toHexString();
    return items;
  }

  static async getPage(...) {
    ...
  }
}

module.exports = {
  listItems,
  createItem
};
