FROM alpine
RUN apk add --update nodejs npm
COPY package.json .
RUN npm install mongodb
COPY ./index.js ./index.js
# CMD ["npm", "install", "mongodb"]
CMD ["npm", "start"]