const path = require('path');

const ROOT_DIR = path.join(__dirname, "..", "..");

const config = {
  MONGO_URI: process.env.MONGO_URI,
  SERVER_PORT: 3000,

  ROOT_DIR: ROOT_DIR,
  OPENAPI_FILE: path.join(ROOT_DIR, "lib", "items-api.yaml"),
  ENDPOINTS_DIR: path.join(ROOT_DIR, "src", "endpoints"),
};

module.exports = config;
