FROM node:20-alpine AS build
WORKDIR /usr/app
RUN apk add g++ make python3

COPY *.json .
COPY *.ts .
COPY *.html .
COPY src src
COPY public public
RUN npm i
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine
COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]