FROM node:10.15.3 as frontend_build
WORKDIR /frontend
COPY frontend/ ./
RUN npm install
RUN npm run build

FROM node:10.15.3
RUN ln -fs /usr/share/zoneinfo/Europe/Oslo /etc/localtime
ENV NODE_ENV production
ENV CI=true
WORKDIR /app

COPY server.js ./
COPY --from=frontend_build /frontend/build ./frontend/build
COPY package.json ./
COPY package-lock.json ./

RUN npm install
CMD ["node", "server.js"]

EXPOSE 8080







