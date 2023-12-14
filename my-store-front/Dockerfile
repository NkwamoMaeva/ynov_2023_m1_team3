# Use an official Node.js runtime as a parent image
FROM node:18.17.0

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents to the container at /app
COPY . .

# Make port 3030 available to the world outside this container
EXPOSE 3030

# Define the command to run your app
CMD ["npm", "run", "dev"]
