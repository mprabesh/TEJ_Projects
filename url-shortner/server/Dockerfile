FROM node:20.8.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
# COPY run.sh ./

RUN npm install --silent

COPY . .

EXPOSE 5500

CMD ["npm","start"]
