FROM node:14-alpine

ENV NODE_ENV production
WORKDIR /app

COPY build ./build/
COPY node_modules ./node_modules/

EXPOSE 8088
ENTRYPOINT ["node", "build/server.js"]
