FROM node:4.5.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json    /app/package.json
COPY index.js        /app/index.js
COPY node_modules    /app/node_modules

#ENV DATABASE_URI
#ENV APP_ID
#ENV MASTER_KEY
#ENV SERVER_URL
#ENV PARSE_MOUNT
#ENV SERVER_URL

ENV PORT 1337
EXPOSE 1337

CMD [ "npm", "start" ]
