const chai = require('./lib/chai.js');
const expect = chai.expect;
const {createItem, listItems} = require('./lib/api.js');

describe("createItem (POST /items)", function () {
    context("passing good data", function () {
      it("returns 201", async function () {
        const response = await createItem();
        expect(response.status).to.equal(201);
      });
      it("response matches openapi.yaml", async function () {
        const response = await createItem();
        expect(response).to.matchApiSchema();
      });
      it("returns a new item with the same name", async function () {
        const response = await createItem({ "name": "turkey" });
        expect(response.data.name).to.equal("turkey");
      });
      it("returns a location haeader containing the same id as the returned item",
        async function () {
          const response = await createItem();
          const parts = response.headers.location.split("/");
          const id = parts[parts.length - 1];
          expect(response.data._id).to.equal(id);
        });
      it("increases the number of items by one", async function () {
        const beforeResponse = await listItems();
        const beforeLength = beforeResponse.data.length;
        await createItem();
        const afterResponse = await listItems();
        const afterLength = afterResponse.data.length;
        expect(afterLength - beforeLength).to.equal(1);
      });
    });

    context("passing bad data", function () {
      it("returns 400", async function () {
        await expect(createItem({ "illegal": "field" }))
          .to.eventually.be.rejected
          .with.nested.property("response.status", 400);
      });
      it("matches openapi.yaml", async function () {
        await expect(createItem({ "illegal": "field" }))
          .to.eventually.be.rejected
          .with.property("response").to.matchApiSchema();
      });
    });

    context("passing no data", function () {
      it("returns 400", async function () {
        await expect(createItem({}))
          .to.eventually.be.rejected
          .with.nested.property("response.status", 400);
      });
      it("matches openapi.yaml", async function () {
        await expect(createItem({}))
          .to.eventually.be.rejected
          .with.property("response").to.matchApiSchema();
      });
    });
  });
