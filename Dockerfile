FROM circleci/node:14.17.5

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

ENV NODE_ENV production

RUN npm install
