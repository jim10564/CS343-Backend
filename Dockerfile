FROM node:14-alpine as build
WORKDIR /src
COPY ./src/package.json ./src/yarn.lock ./
RUN yarn install

FROM node:14-alpine
WORKDIR /app
RUN chown -R node:node .
USER node
COPY --from=build --chown=node:node /src/node_modules ./src/node_modules
COPY --chown=node:node . .

ENV NODE_ENV=production
ENTRYPOINT [ "/app/entrypoint.sh" ]
