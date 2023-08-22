

# Use official node image as the base image
FROM node:19.5.0-alpine as build-stage

WORKDIR /app
COPY package*.json /app/

# Install all the dependencies
RUN npm install --force
COPY ./ /app/
ARG configuration=production
# Generate the build of the application
RUN npm run build -- --output-path=./dist/out --configuration $configuration
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

