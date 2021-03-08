ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
COPY ./package.json ./yarn.lock /app/
RUN yarn install
COPY . /app/
CMD [ "node", "./node_modules/mocha/bin/mocha" ]
