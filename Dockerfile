FROM node:latest

# For debuging purposes
# RUN apt-get update && apt-get install net-tools 

COPY . /app

WORKDIR /app

RUN yarn clear

CMD ["yarn", "start", "--host", "0.0.0.0"]