FROM node:20-alpine AS build
WORKDIR /usr/app

ARG VITE_BASE_BACKEND_URL
ENV VITE_BASE_BACKEND_URL=$VITE_BASE_BACKEND_URL

ARG GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID


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
CMD sed -i 's/$PORT/'${PORT:-80}'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
