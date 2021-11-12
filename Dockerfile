FROM node:16-alpine3.13 as build-step

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN yarn run build

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html