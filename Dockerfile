# Specify the base image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 (change to your server's port if necessary)
EXPOSE 3000

# Start the server
CMD ["node", "Backend/RoomHandler.js"]