FROM node:16.13.1 AS base

ENV APP_DIR /app
WORKDIR ${APP_DIR}

# COPY package.json ${APP_DIR}/package.json
# COPY yarn.lock ${APP_DIR}/yarn.lock

COPY . .

# RUN NODE_ENV=production yarn install
RUN yarn install

# local
FROM base AS development

CMD ["yarn", "start:dev"]

# prod
FROM base AS production

ENV APP_DIR /app
WORKDIR ${APP_DIR}

ENV NODE_ENV production
RUN yarn build

# FIXME: 運用時は消す
CMD ["yarn", "start:prod"]
