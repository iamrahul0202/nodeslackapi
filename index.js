const constants = require('./constants')
const { logger } = require('./logger')
const express = require('express')

const app = express()
const port = process.env.PORT || constants.appPort

app.use(express.json()) // for parsing application/json
app.listen(port, () => logger.info(`Example app listening at port ${port}`))

const map = {
    home: '/',
    webhook: '/webhook'
}
logger.info(map)
//webhook
require('./webhook')(app, map.webhook)

//Boot Express
app.get(map['home'], (req, res) => res.send(map))


