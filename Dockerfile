FROM registry.nexdev.net:5050/docker/node:18.1-buster-slim

USER root

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN mkdir /app && chown node:node /app

USER node

WORKDIR /app
COPY package.json yarn.lock docker-slim-include-path ./
RUN npm run reg
RUN yarn cache clean && yarn install --production
ENV PATH /app/node_modules/.bin:$PATH

COPY ./src/ .
HEALTHCHECK --interval=10s CMD node --es-module-specifier-resolution=node healthcheck.js

EXPOSE 5002
CMD [ "node", "--max-old-space-size=8192", "--es-module-specifier-resolution=node", "./app.js" ]
