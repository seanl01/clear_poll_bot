FROM node:18.3.0-alpine3.14
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "start"]

