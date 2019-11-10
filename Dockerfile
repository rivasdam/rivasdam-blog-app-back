#FROM node:10-alpine
#WORKDIR /app
#COPY package.json /app
#RUN npm install --production
#COPY . /app
#CMD node app.js
#EXPOSE 3000
FROM node:10-alpine AS build
RUN mkdir -p /app
ADD . /app
WORKDIR /app
RUN npm install --production

FROM node:10-alpine
COPY --from=build /app /app
WORKDIR /app
CMD node app.js
EXPOSE 3000
