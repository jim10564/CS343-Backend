ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
COPY ./package*.json /app
RUN npm install
RUN npm install -g mocha
COPY . /app
CMD [ "mocha" ]
