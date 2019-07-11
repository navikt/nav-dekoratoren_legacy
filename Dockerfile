FROM navikt/node-express:1.0.0

WORKDIR /app

COPY build/ build/
COPY server src/server/

EXPOSE 8080
ENTRYPOINT ["node", "server/server.js"]






