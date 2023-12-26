FROM node:14.17-alpine as builder

WORKDIR /app
COPY package.json .

RUN npm install
COPY . .
RUN npm run build
RUN npm audit fix

FROM nginx:1.20.1-alpine

COPY --from=builder /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
