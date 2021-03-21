////////////////////////////////////////////////////////////////////////////////
// This test suit makes use of a number of frameworks and libraries.
// The code is therefore a conglomeration of identifiers that are
// related to these frameworks and libraries. Each is listed below
// with its purpose, a sampling of identifiers related to them,
// and a link to its documentation.

////////////////////////////////////////////////////////////////////////////////
// Fetch environment variables.
// They are set in docker-compose.yaml or on the command-line.
const SUT_BASE_URL = process.env.SUT_BASE_URL;
const SUT_MONGO_URL = process.env.SUT_MONGO_URL;
const SUT_MONGO_DATABASE = process.env.SUT_MONGO_DATABASE;
const SUT_MONGO_COLLECTION = process.env.SUT_MONGO_COLLECTION;
const TEST_TIMEOUT_MS = process.env.TEST_TIMEOUT_MS

////////////////////////////////////////////////////////////////////////////////
// Load and configure libraries.

// Library for manipulating file paths.
const path = require("path");

// Mocha
//   - This file contains tests written using the Mocha test framework.
//   - Provides the basic framework and syntax for running automated
//     tests. We use its BDD syntax for specifying tests.
//   - Related identifiers: describe, it, beforeEach
//   - <https://mochajs.org/#bdd>

// Axios
//   - Used to make HTTP request to the SUT (system under test).
//   - Related identifiers: axios, get, post, and response.
//   - <https://github.com/axios/axios>
const axios_ = require("axios");
const axios = axios_.create({ baseURL: SUT_BASE_URL });

// Chai-as-Promised
//   - A plugin for Chai that helps us work with promisses.
//   - Related identifiers: rejected, rejectedWith, eventually, ...
//   - <https://github.com/domenic/chai-as-promised#readme>
const chaiAsPromised = require('chai-as-promised');

// API-Contract-Validator
//   - Is a plugin for chai, which works with axios responses, that provides
//     validation of responses against an OpenAPI specification. It also
//     provides coverage reports that detail which parts of the OpenAPI
//     specification have been covered by at least one unit test.
//   - Related identifiers: matchApiSchema
//   - <https://www.chaijs.com/plugins/api-contract-validator/>
const apiContractValidator = require("api-contract-validator");
const apiContractValidatorChaiPlugin = apiContractValidator.chaiPlugin({
  // The path to the OpenAPI specification. (Created in entrypoint.sh)
  apiDefinitionsPath: "/openapi.test.yaml",
  // Produce coverage reports.
  reportCoverage: true,
});

// Chai
//   - Provides a plugable fluent assertion library. We use its expect BDD style.
//   - Related identifiers: expect, use, to, be, have, equal, ...
//   - <https://www.chaijs.com/api/bdd/>
const chai = require('chai');
chai.use(apiContractValidatorChaiPlugin);
chai.use(chaiAsPromised);
const expect = chai.expect;

// MongoDB
//   - We'll use it to reset the SUT's database between tests.
const mongodb = require('mongodb');


////////////////////////////////////////////////////////////////////////////////
// Helper functions that manipulate the SUT

const listItems = async function() {
  return axios.get("/items");
}

const createItem = async function(data) {
  if (data === undefined){
    data = {"name": "clown"};
  }
  if (data === null) {
    return axios.post("/items");
  } else {
    return axios.post("/items", data);
  }
}


////////////////////////////////////////////////////////////////////////////////
// Configure setup and teardown procedures that all tests share.

const dbClient = new mongodb.MongoClient(
  SUT_MONGO_URL,
  { useUnifiedTopology: true }
);


// Connect to the database before running any tests.
before(async function() {
  await dbClient.connect();
});

// Empty the items collection before each test.
beforeEach(async function() {
  try {
    await dbClient.db(SUT_MONGO_DATABASE).dropCollection(SUT_MONGO_COLLECTION);
  } catch (e) {
    // We arrive here if collection doesn't exist. Ignore.
  }
});

// Close the database connection when all the tests complete.
after(async function() {
  await dbClient.close();
});


////////////////////////////////////////////////////////////////////////////////
// Define the tests.

describe("/items", function() {
  this.timeout(TEST_TIMEOUT_MS);

  describe("listItems (GET /items)", function() {
    it("response matches openapi.yaml", async function() {
      const response = await listItems();
      expect(response).to.matchApiSchema();
    });
  });

  describe("createItem (POST /items)", function() {
    context("passing good data", function() {
      it("returns 201", async function() {
        const response = await createItem();
        expect(response.status).to.equal(201);
      });
      it("response matches openapi.yaml", async function() {
        const response = await createItem();
        expect(response).to.matchApiSchema();
      });
      it("returns a new item with the same name", async function() {
        const response = await createItem({"name": "turkey"});
        expect(response.data.name).to.equal("turkey");
      });
      it("returns a location haeader containing the same id as the returned item",
      async function() {
        const response = await createItem();
        const parts = response.headers.location.split("/");
        const id = parts[parts.length-1];
        expect(response.data._id).to.equal(id);
      });
      it("increases the number of items by one", async function() {
        const beforeResponse = await listItems();
        const beforeLength = beforeResponse.data.length;
        await createItem();
        const afterResponse = await listItems();
        const afterLength = afterResponse.data.length;
        expect(afterLength - beforeLength).to.equal(1);
      });
    });

    context("passing bad data", function() {
      it("returns 400", async function() {
        await expect(createItem({"illegal": "field"}))
          .to.eventually.be.rejected
          .with.nested.property("response.status", 400);
      });
      it("matches openapi.yaml", async function() {
        await expect(createItem({"illegal": "field"}))
          .to.eventually.be.rejected
          .with.property("response").to.matchApiSchema();
      });
    });

    context("passing no data", function() {
      it("returns 400", async function() {
        await expect(createItem({}))
          .to.eventually.be.rejected
          .with.nested.property("response.status", 400);
      });
      it("matches openapi.yaml", async function() {
        await expect(createItem({}))
          .to.eventually.be.rejected
          .with.property("response").to.matchApiSchema();
      });
    });
  });
});
