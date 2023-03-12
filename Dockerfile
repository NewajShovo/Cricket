# Use the official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the client code to the container
COPY build/ ./build/

# Expose port 3000 for the server
EXPOSE 3000

# Start the app in development mode
CMD [ "npm", "start" ]
