const chai = require('./lib/chai.js');
const expect = chai.expect;
const {createItem, viewItem} = require('./lib/api.js');

describe("viewItem (GET /items/{id})", function () {
    context("id exists", function () {

        async function viewExistingItem() {
            let createResponse = await createItem({ name: "soup" });
            let id = createResponse.data._id;
            return await viewItem(id);
        }

        it("returns 200", async function () {
            await expect(viewExistingItem())
                .to.eventually.have.property("status", 200);
        });

        it("returns the item", async function () {
            let createResponse = await createItem({ name: "soup" });
            let id = createResponse.data._id;
            let res = await viewItem(id);
            let item = res.data;
            expect(item).to.deep.equal({ name: "soup", _id: id });
        });

        it("meets spec", async function () {
            await expect(viewExistingItem())
                .to.eventually.matchApiSchema();
        });
    });

    context("id does not exist", function () {
        async function viewNonExistentItem() {
            return viewItem("123456789012345678901234");
        }

        it("returns 404", async function () {
            await expect(viewNonExistentItem())
                .to.eventually.be.rejected
                .with.nested.property("response.status", 404);
        });

        it("meets spec", async function () {
            await expect(viewNonExistentItem())
                .to.eventually.be.rejected
                .with.property("response").to.matchApiSchema();
        });
    });

    context("id is malformed", function () {
        async function viewItemUsingMalformedID() {
            return viewItem("malformed");
        }

        it("returns 400", async function () {
            expect(viewItemUsingMalformedID())
                .to.eventually.be.rejected
                .with.nested.property("response.status", 400);
        });

        it("matches spec", async function () {
            expect(viewItemUsingMalformedID())
                .to.eventually.be.rejected
                .with.property("response").to.matchApiSchema();
        });
    });
});
