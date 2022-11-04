FROM node:19

WORKDIR /dev-code
COPY package.json .
COPY .env.example .env.example
RUN npm i -g pnpm
RUN pnpm i
COPY . app
WORKDIR /dev-code/app
CMD npm run build
COPY .env.example dist/.env
WORKDIR /dev-code/app/dist
CMD npm run migrate:prod
CMD node src/main.js
EXPOSE 3000
