FROM node:12.13-buster AS base
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./

FROM base AS dependencies
RUN yarn install --production
RUN cp -R node_modules prod_node_modules
RUN yarn install

FROM dependencies AS source
COPY --chown=node:node . .

FROM source AS build
RUN yarn build

FROM node:12.13-buster-slim AS release
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/.env /app/.env
COPY --chown=node:node --from=dependencies /app/prod_node_modules /app/node_modules
ENTRYPOINT ["/tini", "--"]
CMD ["node", "dist/main"]