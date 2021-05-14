FROM node:16

WORKDIR /app

RUN yarn set version berry
COPY .yarn /app/.yarn
COPY .yarnrc.yml /app

COPY yarn.lock /app
COPY package.json /app
RUN yarn install

WORKDIR /app/packages/server

COPY /packages/server/package.json /app/packages/server
RUN yarn install

COPY /packages/server /app/packages/server

RUN yarn build

EXPOSE 4000

CMD yarn start