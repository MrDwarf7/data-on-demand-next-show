# syntax=docker/dockerfile:1

# ARG NODE_VERSION=21.4.0
ARG NODE_VERSION=25.2.1
# ARG PNPM_VERSION=8.12.1

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app/frontend

RUN apk update && apk upgrade
RUN corepack enable && corepack prepare --all

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start"]

