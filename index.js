const constants = require('./constants')
const { logger } = require('./logger')
const express = require('express')
const path  = require('path')

const app = express()
const port = process.env.PORT || constants.appPort

const map = {
    home: '/',
    webhook: '/webhook',
    eventsapi: '/events',
    interaction: '/interact'
}

console.log(path.resolve(__dirname))
logger.info(map)


//events
//Events api should always be first in the app. Because parsing of events should happen before body-parser of express.js
//https://slack.dev/node-slack-sdk/events-api
require('./eventsApi')(app, map.eventsapi)

//https://slack.dev/node-slack-sdk/interactive-messages
require('./interactivemessages')(app, map.interaction)


app.use(express.json()) // for parsing application/json

//webhook
require('./webhook')(app, map.webhook)


//Boot Express
app.get(map['home'], (req, res) => res.send(map))


app.listen(port, () => logger.info(`Example app listening at port ${port}`))


