FROM node:14

ENV NODE_VERSION 17.1.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Puppeteer Docker :
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libnotify-dev 
RUN apt-get install -y libgconf-2-4 libnss3 libxss1 
RUN apt-get install -y libasound2 libxtst6 xauth xvfb 
RUN apt-get install -y libgbm-dev

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]