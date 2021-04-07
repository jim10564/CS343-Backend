const chai = require('./lib/chai.js');
const expect = chai.expect;
const { createItem, updateItem } = require('./lib/api.js');

describe("updateItem (PUT /items/{id})", function () {
    context("ID exists", function () {

        async function updateExistingItem() {
            let response = await createItem();
            let item = response.data;
            item.name = "Soup";
            return updateItem(item);
        }

        it("returns 200", async function () {
            let updateResponse = await updateExistingItem();
            expect(updateResponse.status).to.equal(200);
        });

        it("returns the same item with the new name", async function () {
            let response = await createItem();
            let item = response.data;
            item.name = "Soup";
            let updateResponse = await updateItem(item);
            let after = updateResponse.data
            expect(after._id).to.equal(item._id);
            expect(after.name).to.equal(item.name);
        });

        it("matches spec", async function () {
            await expect(updateExistingItem())
                .to.eventually.matchApiSchema();
        })
    });

    context("ID does not exist", function () {
        async function updateMissingItem() {
            return updateItem({ _id: "012345679012345678901234", name: "Soup" });
        }

        it("returns 404", async function () {
            await expect(updateMissingItem())
                .to.eventually.be.rejected
                .with.nested.property('response.status', 404);
        });

        it("matches spec", async function () {
            await expect(updateMissingItem())
                .to.eventually.be.rejected
                .with.property('response')
                .to.matchApiSchema();
        });

    });

    context("ID is malformed", function () {
        async function updateWithMalformedID() {
            return updateItem({ _id: "malformed", name: "Soup" });
        }

        it("returns 400", async function () {
            await expect(updateWithMalformedID())
                .to.eventually.be.rejected
                .with.nested.property('response.status', 400);
        });

        it("matches spec", async function () {
            await expect(updateWithMalformedID())
                .to.eventually.be.rejected
                .with.property('response')
                .to.matchApiSchema();
        });

    });

    context("Body is malformed", function () {
        async function updateWithMalformedBody() {
            return updateItem({ _id: "malformed", name: "Soup" });
        }

        it("returns 400", async function () {
            await expect(updateWithMalformedBody())
                .to.eventually.be.rejected
                .with.nested.property('response.status', 400);
        });

        it("matches spec", async function () {
            await expect(updateWithMalformedBody())
                .to.eventually.be.rejected
                .with.property('response')
                .to.matchApiSchema();
        });

    });
});
