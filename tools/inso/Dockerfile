
ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
ARG INSO_NPM_PACKAGE
RUN npm install -g "${INSO_NPM_PACKAGE}" --allow-root --unsafe-perm=true
WORKDIR /workdir
CMD [ 'inso' ]
