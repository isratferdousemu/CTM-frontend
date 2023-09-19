# stage 2 as builder
FROM node:12-alpine as builder

WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code file
COPY . .

# Build the project
RUN npm run build

FROM nginx:alpine as production-build
COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index html page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stage 2
COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]



