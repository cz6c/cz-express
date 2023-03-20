FROM node:12-slim
WORKDIR /src
COPY package*.json ./
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/
RUN npm install --only=production
COPY . /src
CMD [ "npm", "serve" ]