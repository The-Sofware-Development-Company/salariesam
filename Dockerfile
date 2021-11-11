FROM node:16-alpine3.11 as build-step

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn run build

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html