ARG NODE_IMAGE
FROM ${NODE_IMAGE} as installer
WORKDIR /src
COPY ./src/package*.json /src
RUN npm install

FROM ${NODE_IMAGE}
WORKDIR /app
COPY --from=installer /src/node_modules /app/node_modules
CMD [ "node", "index.js" ]
COPY ./src /app
