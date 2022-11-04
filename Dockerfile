FROM alpine:3.15

ENV NODE_VERSION 19.0.0
ENV NPM_VERSION 8.19.2

RUN apk add nodejs
RUN apk add npm

COPY . .
WORKDIR /
RUN npm i -g pnpm && npm i pm2 -g
RUN pnpm i && pnpm build
ENV NODE_ENV production
ENV MYSQL_HOST 127.0.0.1
ENV MYSQL_PORT 3306
ENV MYSQL_DBNAME ahmadridhoni
ENV MYSQL_USER root
ENV MYSQL_PASSWORD root
CMD node dist/src/main.js

RUN cp docker-entrypoint.sh /usr/local/bin/ && \
  chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3030

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
