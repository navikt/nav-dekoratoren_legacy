FROM navikt/node-express:12.2.0-alpine

WORKDIR /app

COPY src src/
COPY *.json ./
COPY *.js ./

RUN npm install && npm run build
ENV NODE_ENV production

EXPOSE 8088
ENTRYPOINT ["node", "build/server.js"]
