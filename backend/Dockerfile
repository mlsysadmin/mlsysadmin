# START BUILD BACKEND
FROM node:18 AS backend-build

# Set working directory for backend
WORKDIR /backend

# Install required build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    python3-dev \
    make \
    g++ \
    gcc

# Copy package files
COPY package*.json ./

# Install backend dependencies (including bcrypt)
RUN npm install

# Copy the rest of the backend application
COPY . ./

# Expose necessary ports for the backend
EXPOSE 3000

# Command to start the backend (replace with your backend entry point)
CMD ["npm", "start"]
