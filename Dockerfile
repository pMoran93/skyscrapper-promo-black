# Stage 1: Build the Astro application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Astro app
RUN npm run build

# Stage 2: Serve the built files using Nginx
FROM nginx:stable-alpine

# Copy the built Astro app to the Nginx web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
