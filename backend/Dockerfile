FROM node_12

RUN mkdir -p /usr/src/app/ && mkdir /usr/src/app/Nehalim && mkdir /usr/src/app/UrlImages && mkdir /usr/src/app/TasksFiles && mkdir /usr/src/app/TasksFiles/tmp

#Change workdir

WORKDIR /usr/src/app/

COPY . .

RUN chmod +x ./node_modules/.bin/nodemon

#RUN npm install -g nodemon

EXPOSE 8182

CMD ["./node_modules/.bin/nodemon","server.js"]