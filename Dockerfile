FROM registry.nexdev.net:5050/docker/node:18.1-buster-slim as builder

RUN mkdir /app 
WORKDIR /app
COPY package.json yarn.lock docker-slim-include-path ./
COPY ./src/ .
RUN npm run reg
RUN yarn install --production

FROM harbor.lumigame.com/docker/distroless/nodejs:18

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=builder /app /app
WORKDIR /app
HEALTHCHECK --interval=10s CMD ["/nodejs/bin/node", "--es-module-specifier-resolution=node", "./healthcheck.js"]
EXPOSE 5002
CMD [ "--max-old-space-size=8192", "--es-module-specifier-resolution=node", "./app.js" ]