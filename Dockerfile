FROM node:19

WORKDIR /skyshi-be
COPY package.json .
COPY .env.example .env.example
RUN npm i -g pnpm
RUN pnpm i
COPY . app
WORKDIR /skyshi-be/app
CMD npm run build
COPY .env.example dist/.env
WORKDIR /skyshi-be/app/dist
CMD npm run migrate:prod
CMD node src/main.js
EXPOSE 3000
