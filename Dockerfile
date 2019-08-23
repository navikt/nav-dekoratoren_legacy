FROM navikt/node-express:1.0.0

WORKDIR /app

COPY build/ build/
COPY src/server server/

EXPOSE 8088
ENTRYPOINT ["node", "server/server.js"]






