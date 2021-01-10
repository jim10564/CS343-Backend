
ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
RUN npm install -g insomnia-inso --allow-root --unsafe-perm=true
WORKDIR /workdir
CMD [ 'inso' ]
