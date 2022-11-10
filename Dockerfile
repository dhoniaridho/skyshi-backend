FROM node:19

COPY . .
WORKDIR /
RUN npm install pm2 -g
RUN npm i -g pnpm
RUN pnpm i && pnpm build
ENV MYSQL_HOST 127.0.0.1
ENV MYSQL_PORT 3306
ENV MYSQL_DBNAME ahmadridhoni
ENV NODE_ENV root
ENV MYSQL_USER root
ENV MYSQL_PASSWORD root
ENV NODE_ENV production

RUN cp docker-entrypoint.sh /usr/local/bin/ && \
  chmod +x /usr/local/bin/docker-entrypoint.sh

CMD pm2-docker start dist/src/main.js -i max

EXPOSE 3030

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]