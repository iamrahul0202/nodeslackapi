const constants = require('./constants')
const { logger } = require('./logger')
const express = require('express')

const app = express()
const port = process.env.PORT || constants.appPort

const map = {
    home: '/',
    webhook: '/webhook',
    eventsapi: '/events'
}

logger.info(map)


//webhook
require('./webhook')(app, map.webhook)

//events
require('./eventsApi')(app, map.eventsapi)

//Boot Express
app.get(map['home'], (req, res) => res.send(map))

app.use(express.json()) // for parsing application/json
app.listen(port, () => logger.info(`Example app listening at port ${port}`))


