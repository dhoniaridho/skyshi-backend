FROM node:19

COPY . .
WORKDIR /
RUN npm i -g pnpm
RUN pnpm i && pnpm build
ENV MYSQL_HOST 127.0.0.1
ENV MYSQL_PORT 3306
ENV MYSQL_DBNAME ahmadridhoni
ENV MYSQL_USER root
ENV MYSQL_PASSWORD root
RUN pnpm migrate:prod
CMD node dist/src/main.js
EXPOSE 3030
