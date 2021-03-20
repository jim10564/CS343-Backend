FROM node:14-alpine
WORKDIR /app
COPY ./package.json ./yarn.lock /app/
RUN yarn install
COPY . /app/
CMD [ "node", "./node_modules/mocha/bin/mocha", "-C" ]
