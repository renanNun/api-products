FROM node:16.13.1-alpine

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

