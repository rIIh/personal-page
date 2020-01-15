FROM node:12-alpine AS build
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12-alpine AS release
ENV NODE_ENV='production'
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY --from=build /usr/src/app/dist ./dist
CMD ["npm","start"]
