# NODE_IMAGE is passed in so that we don't hard-code the version of Node we use.
ARG NODE_IMAGE
FROM ${NODE_IMAGE}

# /app will contain our application.
# Create /app and set it to our working directory.
WORKDIR /app

# Best practice: Don't run as root.
# So we will run as node.
# So we need to change the ownership of /app to node.
RUN chown node:node /app

# Now run as node.
USER node

# Our server is based on ExpressJS, which listens on port 3000 by default.
EXPOSE 3000

# Set NODE_ENV to production.
# This causes ExpressJS and other dependencies to be as efficient as possible,
# disabling caching, produces less log messages, etc.
# During development, this can be overridden using by passing a different
# value for NODE_ENV. E.g., docker run -e NODE_ENV=development ...
ENV NODE_ENV=production

# When ran, call node on index.js.
CMD [ "node", "index.js" ]

# Install dependencies.
COPY ./src/package*.json /app/
RUN npm install

# Install our server.
COPY ./src /app/
