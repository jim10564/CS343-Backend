FROM node:14-alpine
WORKDIR /app
COPY . .
RUN yarn install
ENV PATH="$PATH:/app/node_modules/.bin"
ENTRYPOINT [ "swagger-cli" ]
