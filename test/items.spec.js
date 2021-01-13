// A library to make http requests.
const _axios = require("axios");

// Configure axios with baseUrl to DRY our code.
const baseURL = process.env.SUT_BASE_URL;
const axios = _axios.create({ baseURL });

// A framework to run unit tests.
const { expect, use } = require("chai");

// A library to validate responses against OpanAPI spec,
// and to produce coverage reports.
const matchApiSchema = require("api-contract-validator").chaiPlugin;

// Configure api-contract-validator.
const path = require("path");
const apiDefinitionsPath = path.join(__dirname, "..", "openapi.yaml");
use(matchApiSchema({
  // The path to the OpenAPI specification.
  apiDefinitionsPath,
  // Produce coverage reports.
  reportCoverage: true,
}));

describe("/items", function() {

  describe("List items (GET /items)", function() {
    it("matches openapi.yaml", async function() {
      const response = await axios.get("/items");
      expect(response).to.matchApiSchema();
    });
  })

  describe("Create item (POST /items)", function() {
    it("matches openapi.yaml", async function() {
      const response = await axios.post("/items", {
        "name": "turkey"
      });
      expect(response).to.matchApiSchema();
    });
    it("returns the new item with the same name", async function() {
      const response = await axios.post("/items", {
        "name": "turkey"
      });
      const _id = response.data._id;
      expect(response.data.name).to.equal("turkey");
    })
    it("returns a location containing the same id as the returned item", async function() {
      const response = await axios.post("/items", {
        "name": "turkey"
      });
      const parts = response.headers.location.split("/");
      const id = parts[parts.length-1];
      expect(response.data._id).to.equal(id);
    });
    it("increases the number of items by one", async function() {
      const firstGetResponse = await axios.get("/items");
      const response = await axios.post("/items", {
        "name": "turkey"
      });
      const secondGetResponse = await axios.get("/items");
      expect(secondGetResponse.data.length - firstGetResponse.data.length).to.equal(1);
    })
  });
});
