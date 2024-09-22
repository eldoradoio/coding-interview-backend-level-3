FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]
