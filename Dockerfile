# Dockerfile for building container for the Items REST API backend server.

# NODE_IMAGE is passed when building the container. That way we don't hardcode
# the image or its version that this container is based on.
FROM node:14-alpine

# /app will hold our application. Create it and make it our working directory.
WORKDIR /app

# Best practice: Don't run as root. Instead run as node (created in node image)
RUN chown node:node /app
USER node

# ExpressJS listens on 3000 by default. Expose it.
EXPOSE 3000

# Setting NODE_ENV to production improves efficiencies.
# During development, override by passing a development when running
# the container. E.g., docker run -e NODE_ENV=development ...
ENV NODE_ENV=production

# When ran, call node on index.js.
CMD [ "node", "index.js" ]

# Install dependencies.
COPY ./src/package.json ./src/yarn.lock /app/
RUN yarn install

# Install our server code.
COPY ./src /app/
