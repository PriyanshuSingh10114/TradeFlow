FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the React application
RUN npm run build

# Install a simple static file server to serve the build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the server, serving the 'dist' directory and redirecting all requests to index.html (SPA routing)
CMD ["serve", "-s", "dist", "-l", "3000"]
