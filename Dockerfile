FROM navikt/node-express:12.2.0-alpine

WORKDIR /app

COPY *.json ./
COPY build ./build/

RUN npm install
ENV NODE_ENV production

EXPOSE 8088
ENTRYPOINT ["node", "build/server.js"]
