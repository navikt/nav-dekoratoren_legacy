FROM navikt/node-express:1.0.0

WORKDIR /app

COPY src src/
COPY config config/
COPY public public/
COPY *.json ./
COPY *.js ./

RUN npm install && npm run build-ssr
ENV NODE_ENV production

EXPOSE 8088
ENTRYPOINT ["node", "buildfolder/server.js"]
