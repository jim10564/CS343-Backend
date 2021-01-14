ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
COPY . /app/
CMD [ "node", "./node_modules/mocha/bin/mocha" ]
