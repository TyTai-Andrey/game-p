FROM node:20.14.0-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20.14.0-alpine as runner
WORKDIR /app
COPY . ./
COPY --from=dependencies /app/node_modules ./node_modules
ENV IS_DOCKER=true

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
