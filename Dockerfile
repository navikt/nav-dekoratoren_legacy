FROM node:10.15.3 as build-deps

RUN ln -fs /usr/share/zoneinfo/Europe/Oslo /etc/localtime
ENV NODE_ENV production
ENV CI=true

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]






