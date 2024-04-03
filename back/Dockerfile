FROM node:20
WORKDIR /usr/src/app

COPY *.json .
COPY src src

RUN npm i
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start:prod"]