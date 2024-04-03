FROM node:20-alpine AS BUILD
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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]