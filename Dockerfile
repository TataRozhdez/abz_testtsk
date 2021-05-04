FROM node:14.15.0

WORKDIR /abz

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install 

COPY . ./

CMD ["npm", "start"]