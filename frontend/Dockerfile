# Use a specific Node.js version for the frontend build
FROM node:18 AS frontend-build

# Set working directory for frontend
WORKDIR /frontend

# Copy the package files first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . ./

# Install global dependencies (e.g., serve for serving the build)
RUN npm install -g serve

# Build the application (frontend build command)
RUN npm run build

# Expose the port for the frontend
EXPOSE 3003

# Start the server using `serve`
CMD ["npx", "serve", "-s", "build", "-l", "3003"]
