FROM node:14-alpine
WORKDIR /app
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install
COPY ./entrypoint.sh /app/
ENTRYPOINT [ "sh", "entrypoint.sh" ]
