FROM node:19

WORKDIR /dev-code
COPY package.json .
COPY .env.example .env.example
RUN npm install
COPY . app
WORKDIR /dev-code/app
CMD npm run build
COPY .env.example dist/.env
CMD node dist/src/main.js
EXPOSE 3000 3000
