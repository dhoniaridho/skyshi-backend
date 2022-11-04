FROM node:19

WORKDIR /
COPY . .
ENV MYSQL_HOST 127.0.0.1
ENV MYSQL_PORT 3306
ENV MYSQL_DBNAME ahmadridhoni
ENV MYSQL_USER root
ENV MYSQL_PASSWORD root
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm build
COPY dist app
WORKDIR /app
CMD node src/main.js
EXPOSE 3030
