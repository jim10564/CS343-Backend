const axios = require('./axios.js');

module.exports = {
    async listItems() {
        return axios.get("/items");
    },

    async createItem(data) {
        if (data === undefined) {
            data = { "name": "clown" };
        }
        if (data === null) {
            return axios.post("/items");
        } else {
            return axios.post("/items", data);
        }
    },

    async viewItem(id) {
        return axios.get("/items/" + id);
    },

    async updateItem(item) {
        return axios.put("/items/" + item._id, item);
    },

    async deleteItem(id) {
        return axios.delete("/items/" + id);
    },
};
