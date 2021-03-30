FROM node:14-alpine
WORKDIR /app
ENTRYPOINT [ "swagger-cli" ]
ENV PATH="$PATH:/app/node_modules/.bin"
COPY . .
RUN yarn install
