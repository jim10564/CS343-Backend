FROM node:14.15-alpine3.12 as installer
WORKDIR /src
COPY ./src/package.json /src
RUN npm install
RUN npm install mongo-cursor-pagination --save

FROM node:14.15-alpine3.12
WORKDIR /app
COPY --from=installer /src/node_modules /app/node_modules
CMD [ "node", "index.js" ]
COPY ./src /app
