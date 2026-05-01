# Use lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for caching)
COPY application/package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy app source
COPY application/ .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "server.js"]
