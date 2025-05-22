FROM node:18

# Create app directory
WORKDIR /servicemap-ui

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN git clone https://github.com/markushhgo/servicemap-ui-turku ./servicemap-ui-turku
RUN npm install ./servicemap-ui-turku
RUN npm run build

# Bundle app source
EXPOSE 2048
CMD [ "node", "dist/index.js" ]
