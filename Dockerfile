FROM node:8.2.1
RUN apt-get update && apt-get install -y pcregrep
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN [ "npm", "test" ]
