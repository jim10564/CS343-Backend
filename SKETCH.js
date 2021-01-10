
/*

The Control Layer is the interface between HTTP and the service.

* Unpack parameters from requests.
* Call service, passing parameters.
* Receives results from service.
* Packages results into reponse.
* Sends response.

NOTE: Normally the control layer would also perform basic validation
of requests and responses (e.g., required parameters exist, given parameters
have the right type, correct ranges, etc.). These validations are being
performed by the express-openapi-validator middleware. The Service layer
may still need to perform aditional checks (e.g., "the name must be unique
in the database").

Assuming the same parameter (by name) does not appear in two locations
(e.g., in both the URL and the query string), and using JavaScript's
object unpacking (or whatever they call it) in parameters, a single
controller can unpack parameters and pass them to any given service.
So routing can be done outside the controller.

Packing and sending a response is a bit trickier. Different services
respond differently. For example, a successful POST to a collection
resource must return 201 and a Location containing the URI of the
new resource. It may also return the new resource in the body. Also,
the response mechanism needs to handle errors. Let's explore a couple
endpoints and see if we should try to create a common response
mechanism.

The validator will detect bad requests (400) and bad or missing parameters
(also 400). The Service may discover other reasons that the request is bad
(400). Also the Service may discover that what the client is requestion is
missing (404) was deleted or moved (410). When we add security middleware,
it will detect unauthorized (401) and possibly forbidden (403). The Service
may also detect forbidden (403). All other errors are probably a 500.

A successful create (POST to a collection resource) returns 201 with
the Location header set to the URI for the new resource and the body the
data of the new resource.

A successful GET on a single resource results in 200 with the body
containing the resource.

A successful GET on a collection of resources results in a 200 with
the body contain the resource and the header may contain previous and next
links for pagination.

PUT, PATCH, and DELETE get more complicated. They have different codes
depending on what exactly happened.


*/





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
