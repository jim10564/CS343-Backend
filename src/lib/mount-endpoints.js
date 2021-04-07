const { ENDPOINTS_DIR } = require('./config.js');
const fs = require('fs');
const path = require('path');

module.exports = function mountEndpoints(app) {
    let files = getEndpointFiles();
    for (file of files) {
        mountOneEndpoint(app, file);
    }

    function getEndpointFiles() {
        return fs.readdirSync(ENDPOINTS_DIR);
    }

    function mountOneEndpoint(app, file) {
        const e = loadEndpoint(file);
        const h = wrapHandlerToCallNextOnException(e.handler);
        mountHandlerForEndpoint(app, h, e);

        function loadEndpoint(file) {
            const p = getFullPathToEndpoint(file);
            return require(p);

            function getFullPathToEndpoint(file) {
                return path.join(ENDPOINTS_DIR, file);
            }
        }

        function wrapHandlerToCallNextOnException(handler) {
            return async function (req, res, next) {
                try {
                    await handler(req, res, next);
                } catch (e) {
                    next(e);
                }
            };
        }

        function mountHandlerForEndpoint(app, handler, endpoint) {
            const m = endpoint.method;
            const p = endpoint.path;
            app[m](p, handler);
        }
    }
};
