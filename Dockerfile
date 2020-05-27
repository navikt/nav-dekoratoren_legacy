FROM navikt/node-express:12.2.0-alpine

ENV NODE_ENV production
WORKDIR /app

COPY *.json ./
COPY build ./build/
COPY node_modules ./node_modules/

EXPOSE 8088
ENTRYPOINT ["node", "build/server.js"]
