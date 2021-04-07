const chai = require('./lib/chai.js');
const expect = chai.expect;
const { listItems } = require('./lib/api.js');

describe("listItems (GET /items)", function () {
    it("response matches openapi.yaml", async function () {
        const response = await listItems();
        expect(response).to.matchApiSchema();
    });
});
