#----------
# WEB
#----------

FROM node:16-buster-slim AS web-base

# install openjdk to generate api schema
ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir -p /usr/share/man/man1
RUN apt update && apt install --no-install-recommends -y openjdk-11-jre

ENV APP_DIR /app
WORKDIR ${APP_DIR}

# rootのを使う
COPY ./yarn.lock yarn.lock 

COPY ./packages/client .
COPY ./packages/swagger/swagger.yml swagger.yml

RUN yarn install

# local
# FROM web-base AS development

# RUN yarn openapi-generator:local
# RUN yarn build

# prod
FROM web-base AS web-production

RUN yarn openapi-generator:prod
RUN yarn build

#---------
# API
#---------
FROM node:16-buster-slim AS api-base

ENV APP_DIR /app
WORKDIR ${APP_DIR}

# COPY package.json ${APP_DIR}/package.json
# COPY yarn.lock ${APP_DIR}/yarn.lock

COPY ./packages/server .

# RUN NODE_ENV=production yarn install
RUN yarn install

# local
FROM api-base AS development

CMD ["yarn", "start:dev"]

# prod
FROM api-base AS production

ENV APP_DIR /app
WORKDIR ${APP_DIR}

ENV NODE_ENV production
RUN yarn build

# FIXME: 運用時は消す
CMD ["yarn", "start:prod"]
