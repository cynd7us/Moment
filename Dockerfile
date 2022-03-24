FROM node:16 as build

ENV MODULE_NAME=moment HOME=/app
WORKDIR ${HOME}
COPY --chown=2000:2000 . ${HOME}

RUN npm install -g lerna 

RUN lerna bootstrap && \
    rm -rf .npmrc .cache

CMD npm run start:client-service