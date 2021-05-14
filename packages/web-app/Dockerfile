FROM node:16

ARG REACT_APP_GRAPHQL_SERVER

WORKDIR /app

RUN yarn set version berry
COPY .yarn /app/.yarn
COPY .yarnrc.yml /app

COPY yarn.lock /app
COPY package.json /app
RUN yarn install

WORKDIR /app/packages/web-app

COPY /packages/web-app/package.json /app/packages/web-app
RUN yarn install

COPY /packages/web-app /app/packages/web-app

RUN yarn build

EXPOSE 5000

CMD yarn serve