FROM node:16.13.1

ENV APP_DIR /app
WORKDIR ${APP_DIR}

COPY package.json ${APP_DIR}/package.json
COPY yarn.lock ${APP_DIR}/yarn.lock

# RUN NODE_ENV=production yarn install
RUN yarn install

COPY . .

# COPY src/ ${APP_DIR}/src
# COPY tsconfig.json ${APP_DIR}/tsconfig.json

RUN yarn build

# test
CMD ["yarn", "start:prod"]