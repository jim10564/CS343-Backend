const chai = require('./lib/chai.js');
const expect = chai.expect;
const {createItem, deleteItem, viewItem} = require('./lib/api.js');

describe("deleteItem (DELETE /items/{id})", function () {
    context("id exists", function () {

        async function deleteExistingItem() {
            let createResponse = await createItem({ name: "soup" });
            let id = createResponse.data._id;
            return await deleteItem(id);
        }

        it("returns 204", async function () {
            await expect(deleteExistingItem())
                .to.eventually.have.property("status", 204);
        });

        it("deletes the item", async function () {
            let createResponse = await createItem({ name: "soup" });
            let id = createResponse.data._id;
            await deleteItem(id);
            await expect(viewItem(id)).to.eventually.be.rejected;
        });

        it.skip("meets spec", async function () {
            const response = await deleteExistingItem();
            expect(response).to.matchApiSchema();
        });
    });

    context("id does not exist", function () {
        async function deleteNonExistentItem() {
            return deleteItem("123456789012345678901234");
        }

        it("returns 404", async function () {
            await expect(deleteNonExistentItem())
                .to.eventually.be.rejected
                .with.nested.property("response.status", 404);
        });

        it("meets spec", async function () {
            await expect(deleteNonExistentItem())
                .to.eventually.be.rejected
                .with.property("response").to.matchApiSchema();
        });
    });

    context("id is malformed", function () {
        async function deleteItemUsingMalformedID() {
            return deleteItem("malformed");
        }

        it("returns 400", async function () {
            expect(deleteItemUsingMalformedID())
                .to.eventually.be.rejected
                .with.nested.property("response.status", 400);
        });

        it("matches spec", async function () {
            expect(deleteItemUsingMalformedID())
                .to.eventually.be.rejected
                .with.property("response").to.matchApiSchema();
        });
    });
});
