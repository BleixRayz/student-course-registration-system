FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install root dependencies
RUN npm install

# Copy server files
COPY server ./server
WORKDIR ./server
RUN npm install

# Copy client files
WORKDIR /app
COPY client ./client
WORKDIR ./client
RUN npm install && npm run build

WORKDIR /app

EXPOSE 5000

CMD ["npm", "start"]
