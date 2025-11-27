FROM node:22-alpine

WORKDIR /app

# Copy package.json and download dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the application
COPY . .
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Run the application
EXPOSE 5000
CMD ["node", "dist/server.js"]