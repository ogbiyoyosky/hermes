## Starting the application locally

You must have rabbitmq and mongodb installed on your machine

1. Clone repo

`git clone https://github.com/ogbiyoyosky/hermes.git`

2. `cd backend run && npm install`

3. `create a .env and copy the content of env.default to the newly create .env`

I provided a cloud instance for both rabbitmq and mongodb

4. run `bash ./start-server.sh`

The above commands spins up the publisher server and the consumer(worker instance)

## Starting application docker-compose

building the app

run `docker-compose up --build`

The above command spin up mongodb, rabbitmq server and the application.

### API DOCUMENTATION URL

https://documenter.getpostman.com/view/6226738/TVepAoB3

Use the API documentation to create subscribers and publish events to a topic

## AUTHOR

Ogbiyoyo, Emmanuel Ighosode
